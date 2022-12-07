import {TagData} from '../types';

export default {
  name: 'textarea',
  description: {
    kind: 'markdown',
    value: 'Component textarea cho phép người dùng nhập thông tin dạng text.',
  },
  attributes: [
    {
      name: 'name',
      description:
        'Khai báo name khi được sử dụng trong component form, được sử dụng để lấy value cho component form.',
      valueType: 'string',
    },
    {
      name: 'value',
      description: 'Giá trị khởi tạo.',
      valueType: 'string',
    },
    {
      name: 'placeholder',
      description:
        'Nội dung hiển thị trước khi người dùng nhập giá trị của textarea.',
      valueType: 'string',
    },
    {
      name: 'placeholder-class',
      description: 'CSS class cho placeholder.',
      valueType: 'string',
    },
    {
      name: 'placeholder-style',
      description: 'Inline style cho placeholder.',
      valueType: 'string',
    },
    {
      name: 'disabled',
      description: 'Vô hiệu hoá component textarea.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'maxlength',
      description: 'Giới hạn số ký tự được nhập.',
      valueType: 'number',
      defaultValue: {name: '140'},
    },
    {
      name: 'focus',
      description: 'Tự động focus vào textarea.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'auto-height',
      description: 'Tự động tăng chiều cao.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'show-count',
      description: 'Hiển thị số ký tự của textarea.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'true'},
    },
    {
      name: 'controlled',
      description:
        'Nếu giá trị là true, nội dung value của textarea sẽ được điều khiển hoàn toàn thông qua hàm setData trong file js.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'onInput',
      description:
        'Sự kiện sẽ được kích hoạt khi nội dung của textarea bị thay đổi.',
      valueType: 'function',
    },
    {
      name: 'onConfirm',
      description: 'Sự kiện sẽ được kích hoạt khi nhấn nút submit.',
      valueType: 'function',
    },
    {
      name: 'onFocus',
      description: 'Sự kiện sẽ được kích hoạt khi textarea được focus.',
      valueType: 'function',
    },
    {
      name: 'onBlur',
      description: 'Sự kiện sẽ được kích hoạt khi textarea không được focus.',
      valueType: 'function',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/textarea',
    },
  ],
} as TagData;
