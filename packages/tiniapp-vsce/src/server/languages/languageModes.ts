import {
  CompletionList,
  Definition,
  Diagnostic,
  Hover,
  Position,
  Range,
  TextEdit,
} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

import {LanguageIds} from '../../common/languageTypes';
import {getDocumentRegions, TXMLDocumentRegions} from './embeddedSupport';
import {getLanguageModelCache, LanguageModelCache} from './languageModelCache';
import {getMode as getTCSSMode} from './modes/tcss';
import {getMode as getTXMLMode} from './modes/txml';
import {getLanguageService as getTCSSLanguageService} from './services/tcss/languageService';
import {getLanguageService as getTXMLLanguageService} from './services/txml/languageService';

export * from './services/txml/languageService';
export * from './services/txml/languageTypes';

export interface LanguageMode {
  getId(): string;
  doValidation?: (document: TextDocument) => Diagnostic[] | undefined;
  doComplete?: (
    document: TextDocument,
    position: Position,
  ) => CompletionList | undefined;
  doHover?: (document: TextDocument, position: Position) => Hover | undefined;
  doAutoInsert?: (
    document: TextDocument,
    position: Position,
    kind: 'autoClose' | 'autoQuote',
  ) => string | undefined;
  findDefinition?: (
    document: TextDocument,
    position: Position,
  ) => Definition | undefined;
  formatting?: (document: TextDocument) => TextEdit[] | undefined;
  onDocumentRemoved(document: TextDocument): void;
  dispose(): void;
}

export interface LanguageModes {
  getAllModes(): LanguageMode[];
  getAllModesInDocument(document: TextDocument): LanguageMode[];
  getMode(languageId: LanguageIds): LanguageMode | undefined;
  getModeAtPosition(
    document: TextDocument,
    position: Position,
  ): LanguageMode | undefined;
  getModesInRange(document: TextDocument, range: Range): LanguageModeRange[];
  onDocumentRemoved(document: TextDocument): void;
  dispose(): void;
}

export interface LanguageModeRange extends Range {
  mode: LanguageMode | undefined;
  attributeValue?: boolean;
}

export function getLanguageModes(): LanguageModes {
  const txmlLanguageService = getTXMLLanguageService();
  const tcssLanguageService = getTCSSLanguageService();

  // 10 is the default number of cached models
  // 60 is the default number of caching time
  // DocumentRegions is the cache for the language modes & multi-languages
  const documentRegions = getLanguageModelCache<TXMLDocumentRegions>(
    10,
    60,
    document => getDocumentRegions(txmlLanguageService, document),
  );

  let modelCaches: LanguageModelCache<any>[] = [];
  modelCaches.push(documentRegions);

  let modes = Object.create(null);
  modes[LanguageIds.TXML] = getTXMLMode(txmlLanguageService);
  modes[LanguageIds.TCSS] = getTCSSMode(tcssLanguageService, documentRegions);

  return {
    getAllModes(): LanguageMode[] {
      const result = [];
      for (const languageId in modes) {
        const mode = modes[languageId];
        if (mode) {
          result.push(mode);
        }
      }
      return result;
    },
    getAllModesInDocument(document: TextDocument): LanguageMode[] {
      const result = [];
      for (const languageId of documentRegions
        .get(document)
        .getLanguagesInDocument()) {
        const mode = modes[languageId];
        if (mode) {
          result.push(mode);
        }
      }
      return result;
    },
    getMode(languageId: LanguageIds): LanguageMode {
      return modes[languageId];
    },
    getModeAtPosition(
      document: TextDocument,
      position: Position,
    ): LanguageMode | undefined {
      const languageId = documentRegions
        .get(document)
        .getLanguageAtPosition(position);
      if (languageId) {
        return modes[languageId];
      }
      return undefined;
    },
    getModesInRange(document: TextDocument, range: Range): LanguageModeRange[] {
      return documentRegions
        .get(document)
        .getLanguageRanges(range)
        .map(r => {
          return <LanguageModeRange>{
            start: r.start,
            end: r.end,
            mode: r.languageId && modes[r.languageId],
            attributeValue: r.attributeValue,
          };
        });
    },
    onDocumentRemoved(document: TextDocument) {
      modelCaches.forEach(mc => mc.onDocumentRemoved(document));
      for (const mode in modes) {
        modes[mode].onDocumentRemoved(document);
      }
    },
    dispose(): void {
      modelCaches.forEach(mc => mc.dispose());
      modelCaches = [];
      for (const mode in modes) {
        modes[mode].dispose();
      }
      modes = {};
    },
  };
}
