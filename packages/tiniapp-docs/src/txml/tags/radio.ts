import {TagData} from '../types';

export default {
  name: 'radio',
  description: {
    kind: 'markdown',
    value: 'Component radio dùng để chọn một giá trị.',
  },
  attributes: [
    {
      name: 'value',
      description: 'Giá trị của radio.',
      valueType: 'string',
    },
    {
      name: 'checked',
      description: 'Chỉ định radio có được chọn hay không.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'disabled',
      description: 'Vô hiệu hoá component radio.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'color',
      description: 'Màu của component, sử dụng mã màu như trong CSS.',
      valueType: 'string',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/radio',
    },
  ],
} as TagData;
