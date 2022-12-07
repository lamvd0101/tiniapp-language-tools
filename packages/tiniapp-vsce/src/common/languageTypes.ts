export enum LanguageIds {
  TXML = 'xml', // txml is the same as xml
  TCSS = 'css', // tcss is the same as css
  TS = 'typescript',
  JS = 'javascript',
  JSON = 'json',
}

export enum FileExtensions {
  TXML = 'txml',
  TCSS = 'tcss',
  TS = 'ts',
  JS = 'js',
  JSON = 'json',
}

export const FileDocs = [
  {
    scheme: 'file',
    language: LanguageIds.TXML,
    pattern: `**/*.${FileExtensions.TXML}`,
  },
  {
    scheme: 'file',
    language: LanguageIds.TCSS,
    pattern: `**/*.${FileExtensions.TCSS}`,
  },
  {
    scheme: 'file',
    language: LanguageIds.TS,
    pattern: `**/*.${FileExtensions.TS}`,
  },
  {
    scheme: 'file',
    language: LanguageIds.JS,
    pattern: `**/*.${FileExtensions.JS}`,
  },
  {
    scheme: 'file',
    language: LanguageIds.JSON,
    pattern: `**/*.${FileExtensions.JSON}`,
  },
];

export const AutoInsertId = 'txml/autoInsert';

export type AutoInsertKind = 'autoQuote' | 'autoClose';

export interface AutoInsertParams<D, P> {
  /**
   * The auto insert kind
   */
  kind: AutoInsertKind;
  /**
   * The text document.
   */
  textDocument: D;
  /**
   * The position inside the text document.
   */
  position: P;
}
