import {Position, TextDocument} from 'vscode-languageserver-textdocument';

import {LanguageIds} from '../../../common/languageTypes';
import {TXMLDocumentRegions} from '../embeddedSupport';
import {LanguageModelCache} from '../languageModelCache';
import {LanguageMode} from '../languageModes';
import {LanguageService} from '../services/tcss/languageService';

export function getMode(
  languageService: LanguageService,
  documentRegions: LanguageModelCache<TXMLDocumentRegions>,
): LanguageMode {
  return {
    getId() {
      return LanguageIds.TCSS;
    },
    doValidation(document: TextDocument) {
      // Get virtual CSS document, with all non-CSS code replaced with whitespace
      const embedded = documentRegions
        .get(document)
        .getEmbeddedDocument(LanguageIds.TCSS);
      const stylesheet = languageService.parseStylesheet(embedded);
      return languageService.doValidation(embedded, stylesheet);
    },
    doComplete(document: TextDocument, position: Position) {
      // Get virtual CSS document, with all non-CSS code replaced with whitespace
      const embedded = documentRegions
        .get(document)
        .getEmbeddedDocument(LanguageIds.TCSS);
      const stylesheet = languageService.parseStylesheet(embedded);
      return languageService.doComplete(embedded, position, stylesheet);
    },
    onDocumentRemoved(_document: TextDocument) {
      /* nothing to do */
    },
    dispose() {
      /* nothing to do */
    },
  };
}
