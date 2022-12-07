import {TagData} from '../types';

export default {
  name: 'picker-view',
  description: {
    kind: 'markdown',
    value:
      'Component picker-view hiển thị một vùng chọn dạng scroll trong page.',
  },
  attributes: [
    {
      name: 'value',
      description:
        'Chỉ định giá trị được chọn trong các component picker-view-column.',
      valueType: 'array',
    },
    {
      name: 'indicator-style',
      description: 'Inline style cho indicator.',
      valueType: 'string',
    },
    {
      name: 'indicator-class',
      description: 'Class name cho indicator.',
      valueType: 'string',
    },
    {
      name: 'mask-style',
      description: 'Inline style cho mask.',
      valueType: 'string',
    },
    {
      name: 'mask-class',
      description: 'Class name cho mask.',
      valueType: 'string',
    },
    {
      name: 'onChange',
      description: 'Sự kiện được gọi khi giá trị bị thay đổi.',
      valueType: 'function',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/picker-view',
    },
  ],
} as TagData;
