import {
  AttributeData,
  TagData,
  ValueData,
} from '@tikivn/tiniapp-docs/dist/txml';

export interface DataProvider {
  getId(): string;
  isApplicable(languageId: string): boolean;
  provideTags(): TagData[];
  provideTag(tag: string): TagData | undefined;
  provideAttributes(tag: string): AttributeData[];
  provideAttributeInfo(
    tag: string,
    attribute: string,
  ): AttributeData | undefined;
  provideValues(tag: string, attribute: string): ValueData[];
}

// Scanner
export enum TokenType {
  StartCommentTag,
  Comment,
  EndCommentTag,
  StartTagOpen,
  StartTagClose,
  StartTagSelfClose,
  StartTag,
  EndTagOpen,
  EndTagClose,
  EndTag,
  DelimiterAssign,
  AttributeName,
  AttributeValue,
  Content,
  Whitespace,
  Unknown,
  EOS,
}

export enum ScannerState {
  WithinContent,
  AfterOpeningStartTag,
  AfterOpeningEndTag,
  WithinTag,
  WithinEndTag,
  WithinComment,
  AfterAttributeName,
  BeforeAttributeValue,
}

export interface Scanner {
  scan(): TokenType;
  getTokenType(): TokenType;
  getTokenOffset(): number;
  getTokenLength(): number;
  getTokenEnd(): number;
  getTokenText(): string;
  getTokenError(): string | undefined;
  getScannerState(): ScannerState;
}
