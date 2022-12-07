import {Position, TextDocument} from 'vscode-languageserver-textdocument';

import {AutoInsertKind, LanguageIds} from '../../../common/languageTypes';
import {LanguageMode} from '../languageModes';
import {LanguageService} from '../services/txml/languageService';

export function getMode(languageService: LanguageService): LanguageMode {
  return {
    getId() {
      return LanguageIds.TXML;
    },
    doValidation(document: TextDocument) {
      return languageService.doValidation(
        document,
        languageService.parseTXMLDocument(document),
      );
    },
    doComplete(document: TextDocument, position: Position) {
      return languageService.doComplete(
        document,
        position,
        languageService.parseTXMLDocument(document),
      );
    },
    doHover(document: TextDocument, position: Position) {
      return languageService.doHover(
        document,
        position,
        languageService.parseTXMLDocument(document),
      );
    },
    doAutoInsert(
      document: TextDocument,
      position: Position,
      kind: AutoInsertKind,
    ) {
      const offset = document.offsetAt(position);
      const text = document.getText();
      if (kind === 'autoQuote') {
        if (offset > 0 && text.charAt(offset - 1) === '=') {
          return languageService.doQuoteComplete(
            document,
            position,
            languageService.parseTXMLDocument(document),
          );
        }
      } else if (kind === 'autoClose') {
        if (offset > 0 && text.charAt(offset - 1).match(/[>\/]/g)) {
          return languageService.doTagComplete(
            document,
            position,
            languageService.parseTXMLDocument(document),
          );
        }
      }
      return undefined;
    },
    findDefinition(document: TextDocument, position: Position) {
      return languageService.findDefinition(
        document,
        position,
        languageService.parseTXMLDocument(document),
      );
    },
    formatting(document: TextDocument) {
      return languageService.formatting(document);
    },
    onDocumentRemoved(_document: TextDocument) {
      /* nothing to do */
    },
    dispose() {
      /* nothing to do */
    },
  };
}
