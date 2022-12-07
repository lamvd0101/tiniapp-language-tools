import {AttributeData} from '@tikivn/tiniapp-docs/dist/txml';
import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  InsertTextFormat,
  Position,
  Range,
  TextEdit,
} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';
import * as nls from 'vscode-nls';

import {endsWith, isLetterOrDigit} from '../../../utils/string';
import {DataManager} from '../data/dataManager';
import {generateDocumentation} from '../data/dataProvider';
import {ScannerState, TokenType} from '../languageTypes';
import {entities} from '../parser/txmlEntities';
import {Node, TXMLDocument} from '../parser/txmlParser';
import {createScanner} from '../parser/txmlScanner';

const localize = nls.loadMessageBundle();

export class TXMLCompletion {
  constructor(private dataManager: DataManager) {}

  public doComplete(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): CompletionList | undefined {
    const result: CompletionList = {
      isIncomplete: false,
      items: [],
    };

    const dataProviders = this.dataManager
      .getDataProviders()
      .filter(p => p.isApplicable(document.languageId));

    const text = document.getText();
    const offset = document.offsetAt(position);

    const node = txmlDocument.findNodeBefore(offset);
    if (!node) {
      return result;
    }

    const scanner = createScanner(text, node.start);
    let currentTag = '';
    let currentAttributeName: string;

    function getReplaceRange(
      replaceStart: number,
      replaceEnd: number = offset,
    ): Range {
      if (replaceStart > offset) {
        replaceStart = offset;
      }
      return {
        start: document.positionAt(replaceStart),
        end: document.positionAt(replaceEnd),
      };
    }

    function collectOpenTagSuggestions(
      afterOpenBracket: number,
      tagNameEnd?: number,
    ): CompletionList {
      const range = getReplaceRange(afterOpenBracket, tagNameEnd);
      dataProviders.forEach(provider => {
        provider.provideTags().forEach(tag => {
          result.items.push({
            label: tag.name,
            kind: CompletionItemKind.Property,
            documentation: generateDocumentation(tag, undefined, true),
            textEdit: TextEdit.replace(range, tag.name),
            insertTextFormat: InsertTextFormat.PlainText,
          });
        });
      });
      return result;
    }

    function getLineIndent(offset: number) {
      let start = offset;
      while (start > 0) {
        const ch = text.charAt(start - 1);
        if ('\n\r'.indexOf(ch) >= 0) {
          return text.substring(start, offset);
        }
        if (!isWhiteSpace(ch)) {
          return null;
        }
        start--;
      }
      return text.substring(0, offset);
    }

    function collectCloseTagSuggestions(
      afterOpenBracket: number,
      inOpenTag: boolean,
      tagNameEnd: number = offset,
    ): CompletionList {
      const range = getReplaceRange(afterOpenBracket, tagNameEnd);
      const closeTag = isFollowedBy(
        text,
        tagNameEnd,
        ScannerState.WithinEndTag,
        TokenType.EndTagClose,
      )
        ? ''
        : '>';
      let curr: Node | undefined = node;
      if (inOpenTag) {
        curr = curr.parent; // don't suggest the own tag, it's not yet open
      }
      while (curr) {
        const tag = curr.tag;
        if (
          tag &&
          (!curr.closed || (curr.endTagStart && curr.endTagStart > offset))
        ) {
          const item: CompletionItem = {
            label: '/' + tag,
            kind: CompletionItemKind.Property,
            filterText: '/' + tag,
            textEdit: TextEdit.replace(range, '/' + tag + closeTag),
            insertTextFormat: InsertTextFormat.PlainText,
          };
          const startIndent = getLineIndent(curr.start);
          const endIndent = getLineIndent(afterOpenBracket - 1);
          if (
            startIndent !== null &&
            endIndent !== null &&
            startIndent !== endIndent
          ) {
            const insertText = startIndent + '</' + tag + closeTag;
            item.textEdit = TextEdit.replace(
              getReplaceRange(afterOpenBracket - 1 - endIndent.length),
              insertText,
            );
            item.filterText = endIndent + '</' + tag;
          }
          result.items.push(item);
          return result;
        }
        curr = curr.parent;
      }
      if (inOpenTag) {
        return result;
      }

      dataProviders.forEach(provider => {
        provider.provideTags().forEach(tag => {
          result.items.push({
            label: '/' + tag.name,
            kind: CompletionItemKind.Property,
            documentation: generateDocumentation(tag, undefined, true),
            filterText: '/' + tag.name + closeTag,
            textEdit: TextEdit.replace(range, '/' + tag.name + closeTag),
            insertTextFormat: InsertTextFormat.PlainText,
          });
        });
      });
      return result;
    }

    const collectAutoCloseTagSuggestion = (
      tagCloseEnd: number,
      tag: string,
    ): CompletionList => {
      const pos = document.positionAt(tagCloseEnd);
      result.items.push({
        label: '</' + tag + '>',
        kind: CompletionItemKind.Property,
        filterText: '</' + tag + '>',
        textEdit: TextEdit.insert(pos, '$0</' + tag + '>'),
        insertTextFormat: InsertTextFormat.Snippet,
      });
      return result;
    };

    function collectTagSuggestions(
      tagStart: number,
      tagEnd: number,
    ): CompletionList {
      collectOpenTagSuggestions(tagStart, tagEnd);
      collectCloseTagSuggestions(tagStart, true, tagEnd);
      return result;
    }

    function getExistingAttributes(): {[attribute: string]: boolean} {
      const existingAttributes = Object.create(null);
      node.attributeNames.forEach(attribute => {
        existingAttributes[attribute] = true;
      });
      return existingAttributes;
    }

    function collectAttributeNameSuggestions(
      nameStart: number,
      nameEnd: number = offset,
    ): CompletionList {
      let replaceEnd = offset;
      while (replaceEnd < nameEnd && text[replaceEnd] !== '<') {
        // < is a valid attribute name character, but we rather assume the attribute name ends. See #23236.
        replaceEnd++;
      }
      const currentAttribute = text.substring(nameStart, nameEnd);
      const range = getReplaceRange(nameStart, replaceEnd);
      let value = '';
      if (
        !isFollowedBy(
          text,
          nameEnd,
          ScannerState.AfterAttributeName,
          TokenType.DelimiterAssign,
        )
      ) {
        value = '="$1"';
      }

      const seenAttributes = getExistingAttributes();
      // include current typing attribute
      seenAttributes[currentAttribute] = false;

      dataProviders.forEach(provider => {
        provider.provideAttributes(currentTag).forEach(attr => {
          if (seenAttributes[attr.name]) {
            return;
          }
          seenAttributes[attr.name] = true;

          let codeSnippet = attr.name;
          let command;
          if (value.length) {
            codeSnippet = codeSnippet + value;
            if (attr.values || attr.name === 'style') {
              command = {
                title: 'Suggest',
                command: 'editor.action.triggerSuggest',
              };
            }
          }

          result.items.push({
            label: attr.name,
            kind:
              attr.valueType === 'function'
                ? CompletionItemKind.Function
                : CompletionItemKind.Value,
            documentation: generateDocumentation(attr, undefined, true),
            textEdit: TextEdit.replace(range, codeSnippet),
            insertTextFormat: InsertTextFormat.Snippet,
            command,
          });
        });
      });
      return result;
    }

    function collectAttributeValueSuggestions(
      valueStart: number,
      valueEnd: number = offset,
    ): CompletionList {
      let range: Range;
      let addQuotes: boolean;
      if (
        offset > valueStart &&
        offset <= valueEnd &&
        isQuote(text[valueStart])
      ) {
        // inside quoted attribute
        const valueContentStart = valueStart + 1;
        let valueContentEnd = valueEnd;
        // valueEnd points to the char after quote, which encloses the replace range
        if (valueEnd > valueStart && text[valueEnd - 1] === text[valueStart]) {
          valueContentEnd--;
        }

        const wsBefore = getWordStart(text, offset, valueContentStart);
        const wsAfter = getWordEnd(text, offset, valueContentEnd);
        range = getReplaceRange(wsBefore, wsAfter);
        addQuotes = false;
      } else {
        range = getReplaceRange(valueStart, valueEnd);
        addQuotes = true;
      }

      dataProviders.forEach(provider => {
        provider
          .provideValues(currentTag, currentAttributeName)
          .forEach(value => {
            const insertText = addQuotes ? '"' + value.name + '"' : value.name;

            result.items.push({
              label: value.name,
              filterText: insertText,
              kind: CompletionItemKind.Unit,
              documentation: generateDocumentation(value, undefined, true),
              textEdit: TextEdit.replace(range, insertText),
              insertTextFormat: InsertTextFormat.PlainText,
            });
          });
      });
      collectCharacterEntityProposals();
      return result;
    }

    function scanNextForEndPos(nextToken: TokenType): number {
      if (offset === scanner.getTokenEnd()) {
        token = scanner.scan();
        if (token === nextToken && scanner.getTokenOffset() === offset) {
          return scanner.getTokenEnd();
        }
      }
      return offset;
    }

    function collectInsideContent(): CompletionList {
      return collectCharacterEntityProposals();
    }

    function collectCharacterEntityProposals() {
      // character entities
      let k = offset - 1;
      let characterStart = position.character;
      while (k >= 0 && isLetterOrDigit(text, k)) {
        k--;
        characterStart--;
      }
      if (k >= 0 && text[k] === '&') {
        const range = Range.create(
          Position.create(position.line, characterStart - 1),
          position,
        );
        for (const entity in entities) {
          if (endsWith(entity, ';')) {
            const label = '&' + entity;
            result.items.push({
              label,
              kind: CompletionItemKind.Keyword,
              documentation: localize(
                'entity.propose',
                `Character entity representing '${entities[entity]}'`,
              ),
              textEdit: TextEdit.replace(range, label),
              insertTextFormat: InsertTextFormat.PlainText,
            });
          }
        }
      }
      return result;
    }

    let token = scanner.scan();
    while (token !== TokenType.EOS && scanner.getTokenOffset() <= offset) {
      switch (token) {
        case TokenType.StartTagOpen:
          if (scanner.getTokenEnd() === offset) {
            const endPos = scanNextForEndPos(TokenType.StartTag);
            return collectTagSuggestions(offset, endPos);
          }
          break;
        case TokenType.StartTag:
          if (
            scanner.getTokenOffset() <= offset &&
            offset <= scanner.getTokenEnd()
          ) {
            return collectOpenTagSuggestions(
              scanner.getTokenOffset(),
              scanner.getTokenEnd(),
            );
          }
          currentTag = scanner.getTokenText();
          break;
        case TokenType.AttributeName:
          if (
            scanner.getTokenOffset() <= offset &&
            offset <= scanner.getTokenEnd()
          ) {
            return collectAttributeNameSuggestions(
              scanner.getTokenOffset(),
              scanner.getTokenEnd(),
            );
          }
          currentAttributeName = scanner.getTokenText();
          break;
        case TokenType.DelimiterAssign:
          if (scanner.getTokenEnd() === offset) {
            const endPos = scanNextForEndPos(TokenType.AttributeValue);
            return collectAttributeValueSuggestions(offset, endPos);
          }
          break;
        case TokenType.AttributeValue:
          if (
            scanner.getTokenOffset() <= offset &&
            offset <= scanner.getTokenEnd()
          ) {
            return collectAttributeValueSuggestions(
              scanner.getTokenOffset(),
              scanner.getTokenEnd(),
            );
          }
          break;
        case TokenType.Whitespace:
          if (offset <= scanner.getTokenEnd()) {
            switch (scanner.getScannerState()) {
              case ScannerState.AfterOpeningStartTag:
                const startPos = scanner.getTokenOffset();
                const endTagPos = scanNextForEndPos(TokenType.StartTag);
                return collectTagSuggestions(startPos, endTagPos);
              case ScannerState.WithinTag:
              case ScannerState.AfterAttributeName:
                return collectAttributeNameSuggestions(scanner.getTokenEnd());
              case ScannerState.BeforeAttributeValue:
                return collectAttributeValueSuggestions(scanner.getTokenEnd());
              case ScannerState.AfterOpeningEndTag:
                return collectCloseTagSuggestions(
                  scanner.getTokenOffset() - 1,
                  false,
                );
              case ScannerState.WithinContent:
                return collectInsideContent();
            }
          }
          break;
        case TokenType.EndTagOpen:
          if (offset <= scanner.getTokenEnd()) {
            const afterOpenBracket = scanner.getTokenOffset() + 1;
            const endOffset = scanNextForEndPos(TokenType.EndTag);
            return collectCloseTagSuggestions(
              afterOpenBracket,
              false,
              endOffset,
            );
          }
          break;
        case TokenType.EndTag:
          if (offset <= scanner.getTokenEnd()) {
            let start = scanner.getTokenOffset() - 1;
            while (start >= 0) {
              const ch = text.charAt(start);
              if (ch === '/') {
                return collectCloseTagSuggestions(
                  start,
                  false,
                  scanner.getTokenEnd(),
                );
              } else if (!isWhiteSpace(ch)) {
                break;
              }
              start--;
            }
          }
          break;
        case TokenType.StartTagClose:
          if (offset <= scanner.getTokenEnd()) {
            if (currentTag) {
              return collectAutoCloseTagSuggestion(
                scanner.getTokenEnd(),
                currentTag,
              );
            }
          }
          break;
        case TokenType.Content:
          if (offset <= scanner.getTokenEnd()) {
            return collectInsideContent();
          }
          break;
        default:
          if (offset <= scanner.getTokenEnd()) {
            return result;
          }
          break;
      }
      token = scanner.scan();
    }

    return result;
  }

  doQuoteComplete(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): string | undefined {
    let currentTag = '';

    const dataProviders = this.dataManager
      .getDataProviders()
      .filter(p => p.isApplicable(document.languageId));

    const offset = document.offsetAt(position);
    if (offset <= 0) {
      return undefined;
    }

    const char = document.getText().charAt(offset - 1);
    if (char !== '=') {
      return undefined;
    }
    const value = '"$1"';
    const node = txmlDocument.findNodeBefore(offset);

    if (
      node &&
      node.attributes &&
      node.start < offset &&
      (!node.endTagStart || node.endTagStart > offset)
    ) {
      const scanner = createScanner(document.getText(), node.start);
      let token = scanner.scan();
      while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
        if (token === TokenType.StartTag) {
          currentTag = scanner.getTokenText();
        }

        if (
          token === TokenType.AttributeName &&
          scanner.getTokenEnd() === offset - 1
        ) {
          const currentAttributeName = scanner.getTokenText();

          let attributeInfo: AttributeData | undefined;
          dataProviders.forEach(provider => {
            attributeInfo = provider.provideAttributeInfo(
              currentTag,
              currentAttributeName,
            );
          });

          if (attributeInfo?.valueType === 'empty') {
            return undefined;
          }

          // Ensure the token is a valid standalone attribute name
          token = scanner.scan(); // this should be the = just written
          if (token !== TokenType.DelimiterAssign) {
            return undefined;
          }
          token = scanner.scan();
          // Any non-attribute valid tag
          if (
            token === TokenType.Unknown ||
            token === TokenType.AttributeValue
          ) {
            return undefined;
          }
          return value;
        }
        token = scanner.scan();
      }
    }
    return undefined;
  }

  doTagComplete(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): string | undefined {
    const offset = document.offsetAt(position);
    if (offset <= 0) {
      return undefined;
    }

    const char = document.getText().charAt(offset - 1);
    if (char === '>') {
      const node = txmlDocument.findNodeBefore(offset);
      if (
        node &&
        node.tag &&
        node.start < offset &&
        (!node.endTagStart || node.endTagStart > offset)
      ) {
        const scanner = createScanner(document.getText(), node.start);
        let token = scanner.scan();
        while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
          if (
            token === TokenType.StartTagClose &&
            scanner.getTokenEnd() === offset
          ) {
            return `$0</${node.tag}>`;
          }
          token = scanner.scan();
        }
      }
    }

    return undefined;
  }
}

function isQuote(s: string): boolean {
  return /^["']*$/.test(s);
}

function isWhiteSpace(s: string): boolean {
  return /^\s*$/.test(s);
}

function isFollowedBy(
  s: string,
  offset: number,
  initialState: ScannerState,
  expectedToken: TokenType,
) {
  const scanner = createScanner(s, offset, initialState);
  let token = scanner.scan();
  while (token === TokenType.Whitespace) {
    token = scanner.scan();
  }
  return token === expectedToken;
}

function getWordStart(s: string, offset: number, limit: number): number {
  while (offset > limit && !isWhiteSpace(s[offset - 1])) {
    offset--;
  }
  return offset;
}

function getWordEnd(s: string, offset: number, limit: number): number {
  while (offset < limit && !isWhiteSpace(s[offset])) {
    offset++;
  }
  return offset;
}
