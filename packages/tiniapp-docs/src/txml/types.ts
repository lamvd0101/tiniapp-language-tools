import {MarkupContent} from 'vscode-languageserver/node';

export interface TXMLData {
  tags?: TagData[];
  globalAttributes?: AttributeData[];
  valueSets?: ValueSet[];
}

export interface TagData {
  name: string;
  description: string | MarkupContent;
  attributes?: AttributeData[];
  references?: Reference[];
}

export interface AttributeData {
  name: string;
  description?: string | MarkupContent;
  required?: boolean;
  valueSet?: string;
  valueType?: ValueType;
  values?: ValueData[];
  defaultValue?: ValueData;
  references?: Reference[];
}

type ValueType =
  | 'empty'
  | 'number'
  | 'string'
  | 'boolean'
  | 'function'
  | 'array'
  | 'object'
  | 'interpolation';

export interface ValueData {
  name: string;
  description?: string | MarkupContent;
  references?: Reference[];
}

export interface ValueSet {
  name: string;
  values: ValueData[];
}

export interface Reference {
  name: string;
  url: string;
}
