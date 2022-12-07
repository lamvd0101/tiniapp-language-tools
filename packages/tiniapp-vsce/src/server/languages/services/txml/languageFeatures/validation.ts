import {Diagnostic, DiagnosticSeverity} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

import {DataManager} from '../data/dataManager';
import {TXMLDocument} from '../parser/txmlParser';

export class TXMLValidation {
  constructor(private dataManager: DataManager) {}

  doValidation(
    _document: TextDocument,
    _txmlDocument: TXMLDocument,
  ): Diagnostic[] | undefined {
    return undefined;
  }
}
