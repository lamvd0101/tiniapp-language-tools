import {
  AttributeData,
  TagData,
  TXMLData,
  ValueData,
} from '@tikivn/tiniapp-docs/dist/txml';
import {MarkupContent} from 'vscode-languageserver/node';

import {normalizeMarkupContent} from '../../../utils/markup';
import {DataProvider as IDataProvider} from '../languageTypes';

export class DataProvider implements IDataProvider {
  private _tags: TagData[] = [];
  private _tagMap: {[t: string]: TagData | undefined} = {};
  private _globalAttributes: AttributeData[];
  private _valueSetMap: {[setName: string]: ValueData[] | undefined} = {};

  constructor(private readonly id: string, txmlData: TXMLData) {
    this._tags = txmlData.tags || [];
    this._tags.forEach(t => {
      this._tagMap[t.name.toLowerCase()] = t;
    });

    this._globalAttributes = txmlData.globalAttributes || [];

    if (txmlData.valueSets) {
      txmlData.valueSets.forEach(vs => {
        this._valueSetMap[vs.name] = vs.values;
      });
    }
  }

  getId() {
    return this.id;
  }

  isApplicable() {
    return true;
  }

  provideTags() {
    return this._tags;
  }

  provideTag(tag: string) {
    const tagEntry = this._tagMap[tag.toLowerCase()];
    return tagEntry;
  }

  provideAttributes(tag: string) {
    const attributes: AttributeData[] = [];
    const processAttribute = (a: AttributeData) => {
      attributes.push(a);
    };
    const tagEntry = this._tagMap[tag.toLowerCase()];
    if (tagEntry?.attributes) {
      tagEntry?.attributes.forEach(processAttribute);
    }
    this._globalAttributes.forEach(processAttribute);

    return attributes;
  }

  provideAttributeInfo(tag: string, attribute: string) {
    let attributeInfo: AttributeData | undefined;

    const processAttributes = (attributes: AttributeData[]) => {
      attributes.forEach(a => {
        if (a.name.toLowerCase() === attribute) {
          attributeInfo = a;
        }
      });
    };

    const tagEntry = this._tagMap[tag.toLowerCase()];
    if (tagEntry?.attributes) {
      processAttributes(tagEntry.attributes);
    }
    processAttributes(this._globalAttributes);

    return attributeInfo;
  }

  provideValues(tag: string, attribute: string) {
    const values: ValueData[] = [];

    attribute = attribute.toLowerCase();

    const processAttributes = (attributes: AttributeData[]) => {
      attributes.forEach(a => {
        if (a.name.toLowerCase() === attribute) {
          a.values?.forEach(v => {
            values.push(v);
          });
          if (a.valueSet) {
            this._valueSetMap[a.valueSet]?.forEach(v => {
              values.push(v);
            });
          }
        }
      });
    };

    const tagEntry = this._tagMap[tag.toLowerCase()];
    if (tagEntry?.attributes) {
      processAttributes(tagEntry.attributes);
    }
    processAttributes(this._globalAttributes);

    return values;
  }
}

export function generateDocumentation(
  item: TagData | AttributeData | ValueData,
  settings: {documentation?: boolean; references?: boolean} = {},
  doesSupportMarkdown: boolean,
): MarkupContent | undefined {
  const result: MarkupContent = {
    kind: doesSupportMarkdown ? 'markdown' : 'plaintext',
    value: '',
  };

  if (item.description && settings.documentation !== false) {
    const normalizedDescription = normalizeMarkupContent(item.description);
    if (normalizedDescription) {
      result.value += normalizedDescription.value;
    }
  }

  if (
    item.references &&
    item.references.length > 0 &&
    settings.references !== false
  ) {
    if (result.value.length) {
      result.value += `\n\n`;
    }
    if (doesSupportMarkdown) {
      result.value += item.references
        .map(r => {
          return `[${r.name}](${r.url})`;
        })
        .join(' | ');
    } else {
      result.value += item.references
        .map(r => {
          return `${r.name}: ${r.url}`;
        })
        .join('\n');
    }
  }

  if (result.value === '') {
    return undefined;
  }

  return result;
}
