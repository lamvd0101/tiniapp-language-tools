import {Hover, Position, Range} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';
import * as nls from 'vscode-nls';

import {isLetterOrDigit} from '../../../utils/string';
import {DataManager} from '../data/dataManager';
import {generateDocumentation} from '../data/dataProvider';
import {TokenType} from '../languageTypes';
import {entities} from '../parser/txmlEntities';
import {TXMLDocument} from '../parser/txmlParser';
import {createScanner} from '../parser/txmlScanner';

const localize = nls.loadMessageBundle();

export class TXMLHover {
  constructor(private dataManager: DataManager) {}

  doHover(
    document: TextDocument,
    position: Position,
    txmlDocument: TXMLDocument,
  ): Hover | undefined {
    const offset = document.offsetAt(position);
    const node = txmlDocument.findNodeAt(offset);
    const text = document.getText();

    if (!node || !node.tag) {
      return undefined;
    }

    const dataProviders = this.dataManager
      .getDataProviders()
      .filter(p => p.isApplicable(document.languageId));

    function getTagHover(currTag: string, range: Range): Hover | undefined {
      for (const provider of dataProviders) {
        let hover: Hover | null = null;

        provider.provideTags().forEach(tag => {
          if (tag.name.toLowerCase() === currTag.toLowerCase()) {
            let markupContent = generateDocumentation(tag, undefined, true);
            if (!markupContent) {
              markupContent = {
                kind: 'markdown',
                value: '',
              };
            }
            hover = {contents: markupContent, range};
          }
        });

        if (hover) {
          return hover;
        }
      }

      return undefined;
    }

    function getAttrHover(
      currTag: string,
      currAttr: string,
      range: Range,
    ): Hover | undefined {
      for (const provider of dataProviders) {
        let hover: Hover | null = null;

        provider.provideAttributes(currTag).forEach(attr => {
          if (currAttr === attr.name && attr.description) {
            const contentsDoc = generateDocumentation(attr, undefined, true);
            if (contentsDoc) {
              hover = {contents: contentsDoc, range};
            } else {
              hover = null;
            }
          }
        });

        if (hover) {
          return hover;
        }
      }

      return undefined;
    }

    function getAttrValueHover(
      currTag: string,
      currAttr: string,
      currAttrValue: string,
      range: Range,
    ): Hover | undefined {
      for (const provider of dataProviders) {
        let hover: Hover | null = null;

        provider.provideValues(currTag, currAttr).forEach(attrValue => {
          if (currAttrValue === attrValue.name && attrValue.description) {
            const contentsDoc = generateDocumentation(
              attrValue,
              undefined,
              true,
            );
            if (contentsDoc) {
              hover = {contents: contentsDoc, range};
            } else {
              hover = null;
            }
          }
        });

        if (hover) {
          return hover;
        }
      }
      return undefined;
    }

    function getEntityHover(text: string, range: Range): Hover | undefined {
      const currEntity = filterEntity(text);

      for (const entity in entities) {
        let hover: Hover | null = null;

        const label = '&' + entity;

        if (currEntity === label) {
          const code = entities[entity]
            .charCodeAt(0)
            .toString(16)
            .toUpperCase();

          let hex = 'U+';

          if (code.length < 4) {
            const zeroes = 4 - code.length;
            let k = 0;

            while (k < zeroes) {
              hex += '0';
              k += 1;
            }
          }

          hex += code;
          const contentsDoc = localize(
            'entity.propose',
            `Character entity representing '${entities[entity]}', unicode equivalent '${hex}'`,
          );
          if (contentsDoc) {
            hover = {contents: contentsDoc, range};
          } else {
            hover = null;
          }
        }

        if (hover) {
          return hover;
        }
      }
      return undefined;
    }

    function getTagNameRange(
      tokenType: TokenType,
      startOffset: number,
    ): Range | undefined {
      const scanner = createScanner(document.getText(), startOffset);

      let token = scanner.scan();
      while (
        token !== TokenType.EOS &&
        (scanner.getTokenEnd() < offset ||
          (scanner.getTokenEnd() === offset && token !== tokenType))
      ) {
        token = scanner.scan();
      }
      if (token === tokenType && offset <= scanner.getTokenEnd()) {
        return {
          start: document.positionAt(scanner.getTokenOffset()),
          end: document.positionAt(scanner.getTokenEnd()),
        };
      }

      return undefined;
    }

    function getEntityRange(): Range | null {
      let k = offset - 1;
      let characterStart = position.character;

      while (k >= 0 && isLetterOrDigit(text, k)) {
        k--;
        characterStart--;
      }

      let n = k + 1;
      let characterEnd = characterStart;

      while (isLetterOrDigit(text, n)) {
        n++;
        characterEnd++;
      }

      if (k >= 0 && text[k] === '&') {
        let range: Range | null = null;

        if (text[n] === ';') {
          range = Range.create(
            Position.create(position.line, characterStart),
            Position.create(position.line, characterEnd + 1),
          );
        } else {
          range = Range.create(
            Position.create(position.line, characterStart),
            Position.create(position.line, characterEnd),
          );
        }

        return range;
      }

      return null;
    }

    function filterEntity(text: string): string {
      let k = offset - 1;
      let newText = '&';

      while (k >= 0 && isLetterOrDigit(text, k)) {
        k--;
      }

      k = k + 1;

      while (isLetterOrDigit(text, k)) {
        newText += text[k];
        k += 1;
      }

      newText += ';';

      return newText;
    }

    if (node.endTagStart && offset >= node.endTagStart) {
      const tagRange = getTagNameRange(TokenType.EndTag, node.endTagStart);
      if (tagRange) {
        return getTagHover(node.tag, tagRange);
      }
      return undefined;
    }

    const tagRange = getTagNameRange(TokenType.StartTag, node.start);
    if (tagRange) {
      return getTagHover(node.tag, tagRange);
    }

    const attrRange = getTagNameRange(TokenType.AttributeName, node.start);
    if (attrRange) {
      const tag = node.tag;
      const attr = document.getText(attrRange);
      return getAttrHover(tag, attr, attrRange);
    }

    const entityRange = getEntityRange();
    if (entityRange) {
      return getEntityHover(text, entityRange);
    }

    function scanAttrAndAttrValue(nodeStart: number, attrValueStart: number) {
      const scanner = createScanner(document.getText(), nodeStart);
      let token = scanner.scan();
      let prevAttr = undefined;
      while (
        token !== TokenType.EOS &&
        scanner.getTokenEnd() <= attrValueStart
      ) {
        token = scanner.scan();
        if (token === TokenType.AttributeName) {
          prevAttr = scanner.getTokenText();
        }
      }

      return prevAttr;
    }

    const attrValueRange = getTagNameRange(
      TokenType.AttributeValue,
      node.start,
    );
    if (attrValueRange) {
      const tag = node.tag;
      const attrValue = trimQuotes(document.getText(attrValueRange));
      const matchAttr = scanAttrAndAttrValue(
        node.start,
        document.offsetAt(attrValueRange.start),
      );

      if (matchAttr) {
        return getAttrValueHover(tag, matchAttr, attrValue, attrValueRange);
      }
    }

    return undefined;
  }
}

function trimQuotes(s: string) {
  if (s.length <= 1) {
    return s.replace(/['"]/, '');
  }

  if (s[0] === `'` || s[0] === `"`) {
    s = s.slice(1);
  }

  if (s[s.length - 1] === `'` || s[s.length - 1] === `"`) {
    s = s.slice(0, -1);
  }

  return s;
}
