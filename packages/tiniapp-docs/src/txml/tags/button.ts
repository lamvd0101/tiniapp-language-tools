import {TagData} from '../types';

export default {
  name: 'button',
  description: {
    kind: 'markdown',
    value:
      'Component button cho phép người dùng nhấn để thực hiện một hành động.',
  },
  attributes: [
    {
      name: 'size',
      description: 'Kích thước của button.',
      valueType: 'string',
      values: [
        {
          name: 'large',
        },
        {
          name: 'medium',
        },
        {
          name: 'small',
        },
      ],
      defaultValue: {name: 'large'},
    },
    {
      name: 'type',
      description: 'Kiểu button.',
      valueType: 'string',
      values: [
        {
          name: 'solid',
        },
        {
          name: 'outline',
        },
        {
          name: 'ghost',
        },
      ],
      defaultValue: {name: 'solid'},
    },
    {
      name: 'loading',
      description:
        'Hiển thị icon loading bên cạnh caption. Trong lúc hiển thị loading, button bị vô hiệu hoá.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'disabled',
      description: 'Vô hiệu hoá component button.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'form-type',
      description:
        'Giá trị là submit hoặc reset, sử dụng với component form. Khi tap vào component button, sẽ gọi sự kiện onSubmit hoặc onReset của component form.',
      valueType: 'string',
      values: [
        {
          name: 'submit',
        },
        {
          name: 'reset',
        },
      ],
    },
    {
      name: 'onTap',
      description: 'Sự kiện được kích hoạt khi tap vào button.',
      valueType: 'function',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/button',
    },
  ],
} as TagData;
