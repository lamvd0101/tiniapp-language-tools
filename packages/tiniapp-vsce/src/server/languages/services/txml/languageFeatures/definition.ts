import {Definition, Position} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

import {DataManager} from '../data/dataManager';
import {TXMLDocument} from '../parser/txmlParser';

export class TXMLDefinition {
  constructor(private dataManager: DataManager) {}

  findDefinition(
    _document: TextDocument,
    _position: Position,
    _txmlDocument: TXMLDocument,
  ): Definition | undefined {
    // Find target files
    return undefined;
  }
}
