import {TagData} from '../types';

export default {
  name: 'picker',
  description: {
    kind: 'markdown',
    value:
      'Component picker cho phép người dùng chọn một phần tử trong một mảng dưới dạng scroll.',
  },
  attributes: [
    {
      name: 'title',
      description: 'Title của picker.',
      valueType: 'string',
    },
    {
      name: 'range',
      description: 'Mảng các phần tử hiển thị trong picker.',
      valueType: 'array',
    },
    {
      name: 'confirm-button-text',
      description: 'Nội dung của button dưới footer.',
      valueType: 'string',
      defaultValue: {name: 'OK'},
    },
    {
      name: 'confirm-button-class',
      description: 'Class của button dưới footer.',
      valueType: 'string',
    },
    {
      name: 'rang-key',
      description:
        'Chỉ định key nào trong object sẽ được hiển thị, được dùng khi range là mảng đối tượng.',
    },
    {
      name: 'value',
      description: 'Chỉ định index nào được chọn, bắt đầu từ 0.',
      valueType: 'number',
    },
    {
      name: 'onChange',
      description: 'Sự kiện được gọi khi giá trị bị thay đổi.',
      valueType: 'function',
    },
    {
      name: 'disabled',
      description: 'Vô hiệu hoá component picker.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/picker',
    },
  ],
} as TagData;
