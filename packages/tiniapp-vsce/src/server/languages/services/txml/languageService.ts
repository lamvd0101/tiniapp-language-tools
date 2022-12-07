import {
  CompletionList,
  Definition,
  Diagnostic,
  Hover,
  Position,
  TextEdit,
} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

import {DataManager} from './data/dataManager';
import {DataProvider as IDataProvider} from './data/dataProvider';
import {TXMLCompletion} from './languageFeatures/completion';
import {TXMLDefinition} from './languageFeatures/definition';
import {TXMLFormatting} from './languageFeatures/formatting';
import {TXMLHover} from './languageFeatures/hover';
import {TXMLValidation} from './languageFeatures/validation';
import {Scanner} from './languageTypes';
import {Parser, TXMLDocument} from './parser/txmlParser';
import {createScanner} from './parser/txmlScanner';

export interface LanguageService {
  setDataProviders(
    useDefaultDataProvider: boolean,
    customDataProviders: IDataProvider[],
  ): void;
  createScanner(input: string, initialOffset?: number): Scanner;
  parseTXMLDocument(document: TextDocument): TXMLDocument;
  doValidation: (
    document: TextDocument,
    txmlDocument: TXMLDocument,
  ) => Diagnostic[] | undefined;
  doComplete(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): CompletionList | undefined;
  doQuoteComplete(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): string | undefined;
  doTagComplete(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): string | undefined;
  doHover(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): Hover | undefined;
  findDefinition(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): Definition | undefined;
  formatting: (document: TextDocument) => TextEdit[] | undefined;
}

export function getLanguageService(): LanguageService {
  const dataManager = new DataManager();
  const parser = new Parser(dataManager);

  const txmlValidation = new TXMLValidation(dataManager);
  const txmlCompletion = new TXMLCompletion(dataManager);
  const txmlHover = new TXMLHover(dataManager);
  const txmlDefinition = new TXMLDefinition(dataManager);
  const txmlFormatting = new TXMLFormatting();

  return {
    setDataProviders: dataManager.setDataProviders.bind(dataManager),
    createScanner,
    parseTXMLDocument: parser.parseDocument.bind(parser),
    //
    doValidation: txmlValidation.doValidation.bind(txmlValidation),
    doComplete: txmlCompletion.doComplete.bind(txmlCompletion),
    doQuoteComplete: txmlCompletion.doQuoteComplete.bind(txmlCompletion),
    doTagComplete: txmlCompletion.doTagComplete.bind(txmlCompletion),
    doHover: txmlHover.doHover.bind(txmlHover),
    findDefinition: txmlDefinition.findDefinition.bind(txmlDefinition),
    formatting: txmlFormatting.formatting.bind(txmlFormatting),
  };
}
