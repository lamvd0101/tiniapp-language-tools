import {Position, Range} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

import {LanguageIds} from '../../common/languageTypes';
import {LanguageService, TokenType} from './languageModes';

export interface LanguageRange extends Range {
  languageId: LanguageIds | undefined;
  attributeValue?: boolean;
}

export interface TXMLDocumentRegions {
  getEmbeddedDocument(
    languageId: LanguageIds,
    ignoreAttributeValues?: boolean,
  ): TextDocument;
  getLanguageRanges(range: Range): LanguageRange[];
  getLanguageAtPosition(position: Position): string | undefined;
  getLanguagesInDocument(): string[];
  getImportedScripts(): string[];
}

export const CSS_STYLE_RULE = '__';

interface EmbeddedRegion {
  languageId: LanguageIds | undefined;
  start: number;
  end: number;
  attributeValue?: boolean;
}

// Detect multi languages in the document
export function getDocumentRegions(
  languageService: LanguageService,
  document: TextDocument,
): TXMLDocumentRegions {
  const regions: EmbeddedRegion[] = [];
  const scanner = languageService.createScanner(document.getText());
  let lastAttributeName: string | null = null;
  const importedScripts: string[] = [];

  let token = scanner.scan();
  while (token !== TokenType.EOS) {
    switch (token) {
      case TokenType.StartTag:
        lastAttributeName = null;
        break;
      case TokenType.AttributeName:
        lastAttributeName = scanner.getTokenText();
        break;
      case TokenType.AttributeValue:
        const attributeLanguageId = getAttributeLanguage(lastAttributeName);
        if (attributeLanguageId) {
          let start = scanner.getTokenOffset();
          let end = scanner.getTokenEnd();
          const firstChar = document.getText()[start];
          if (firstChar === "'" || firstChar === '"') {
            start++;
            end--;
          }
          regions.push({
            languageId: attributeLanguageId,
            start,
            end,
            attributeValue: true,
          });
        }
        lastAttributeName = null;
        break;
    }
    token = scanner.scan();
  }

  return {
    getEmbeddedDocument: (
      languageId: LanguageIds,
      ignoreAttributeValues: boolean,
    ) =>
      getEmbeddedDocument(document, regions, languageId, ignoreAttributeValues),
    getLanguageRanges: (range: Range) =>
      getLanguageRanges(document, regions, range),
    getLanguageAtPosition: (position: Position) =>
      getLanguageAtPosition(document, regions, position),
    getLanguagesInDocument: () => getLanguagesInDocument(document, regions),
    getImportedScripts: () => importedScripts,
  };
}

// Implement features
function getEmbeddedDocument(
  document: TextDocument,
  contents: EmbeddedRegion[],
  languageId: LanguageIds,
  ignoreAttributeValues: boolean,
): TextDocument {
  let currentPos = 0;
  const oldContent = document.getText();
  let result = '';
  let lastSuffix = '';
  for (const c of contents) {
    if (
      c.languageId === languageId &&
      (!ignoreAttributeValues || !c.attributeValue)
    ) {
      result = substituteWithWhitespace(
        result,
        currentPos,
        c.start,
        oldContent,
        lastSuffix,
        getPrefix(c),
      );
      result += oldContent.substring(c.start, c.end);
      currentPos = c.end;
      lastSuffix = getSuffix(c);
    }
  }
  result = substituteWithWhitespace(
    result,
    currentPos,
    oldContent.length,
    oldContent,
    lastSuffix,
    '',
  );
  return TextDocument.create(
    document.uri,
    languageId,
    document.version,
    result,
  );
}

function getLanguageRanges(
  document: TextDocument,
  regions: EmbeddedRegion[],
  range: Range,
): LanguageRange[] {
  const result: LanguageRange[] = [];
  let currentPos = range ? range.start : Position.create(0, 0);
  let currentOffset = range ? document.offsetAt(range.start) : 0;
  const endOffset = range
    ? document.offsetAt(range.end)
    : document.getText().length;
  for (const region of regions) {
    if (region.end > currentOffset && region.start < endOffset) {
      const start = Math.max(region.start, currentOffset);
      const startPos = document.positionAt(start);
      if (currentOffset < region.start) {
        result.push({
          start: currentPos,
          end: startPos,
          languageId: LanguageIds.TXML,
        });
      }
      const end = Math.min(region.end, endOffset);
      const endPos = document.positionAt(end);
      if (end > region.start) {
        result.push({
          start: startPos,
          end: endPos,
          languageId: region.languageId,
          attributeValue: region.attributeValue,
        });
      }
      currentOffset = end;
      currentPos = endPos;
    }
  }
  if (currentOffset < endOffset) {
    const endPos = range ? range.end : document.positionAt(endOffset);
    result.push({
      start: currentPos,
      end: endPos,
      languageId: LanguageIds.TXML,
    });
  }
  return result;
}

function getLanguageAtPosition(
  document: TextDocument,
  regions: EmbeddedRegion[],
  position: Position,
): string | undefined {
  const offset = document.offsetAt(position);
  for (const region of regions) {
    if (region.start <= offset) {
      if (offset <= region.end) {
        return region.languageId;
      }
    } else {
      break;
    }
  }
  return LanguageIds.TXML;
}

function getLanguagesInDocument(
  _document: TextDocument,
  regions: EmbeddedRegion[],
): string[] {
  const result = [];
  for (const region of regions) {
    if (region.languageId && result.indexOf(region.languageId) === -1) {
      result.push(region.languageId);
      if (result.length === 3) {
        return result;
      }
    }
  }
  result.push(LanguageIds.TXML);
  return result;
}

// Utils
function getAttributeLanguage(
  attributeName: string | null,
): LanguageIds | null {
  if (!attributeName) {
    return null;
  }
  const match = attributeName.match(/^(style)$|^(on\w+)$/i);
  if (!match) {
    return null;
  }
  return match[1] ? LanguageIds.TCSS : null; // Maybe check for on* events
}

function substituteWithWhitespace(
  result: string,
  start: number,
  end: number,
  oldContent: string,
  before: string,
  after: string,
) {
  let accumulatedWS = 0;
  result += before;
  for (let i = start + before.length; i < end; i++) {
    const ch = oldContent[i];
    if (ch === '\n' || ch === '\r') {
      // only write new lines, skip the whitespace
      accumulatedWS = 0;
      result += ch;
    } else {
      accumulatedWS++;
    }
  }
  result = append(result, ' ', accumulatedWS - after.length);
  result += after;
  return result;
}

function append(result: string, str: string, n: number): string {
  while (n > 0) {
    if (n & 1) {
      result += str;
    }
    n >>= 1;
    str += str;
  }
  return result;
}

function getPrefix(c: EmbeddedRegion) {
  if (c.attributeValue) {
    switch (c.languageId) {
      case LanguageIds.TCSS:
        return CSS_STYLE_RULE + '{';
    }
  }
  return '';
}

function getSuffix(c: EmbeddedRegion) {
  if (c.attributeValue) {
    switch (c.languageId) {
      case LanguageIds.TCSS:
        return '}';
      case LanguageIds.JS:
        return ';';
    }
  }
  return '';
}
