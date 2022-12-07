import {TagData} from '../types';

export default {
  name: 'input',
  description: {
    kind: 'markdown',
    value: 'Component input cho phép người dùng nhập thông tin dạng text.',
  },
  attributes: [
    {
      name: 'type',
      description: 'Quy định định dạng dữ liệu được nhập vào input.',
      valueType: 'string',
      values: [
        {
          name: 'text',
        },
        {
          name: 'email',
        },
        {
          name: 'number',
        },
        {
          name: 'decimal',
        },
        {
          name: 'tel',
        },
        {
          name: 'search',
        },
        {
          name: 'url',
        },
      ],
    },
    {
      name: 'password',
      description:
        'Chỉ định input dùng để nhập mật khẩu. Mỗi ký tự người dùng nhập vào sẽ được đại diện bằng chấm tròn (•).',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
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
        'Nội dung hiển thị trước khi người dùng nhập giá trị của input.',
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
      description: 'Vô hiệu hoá component input.',
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
      description: 'Tự động focus vào input.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'confirm-type',
      description: 'Quy định nhãn hiển thị cho phím return trên bàn phím ảo.',
      valueType: 'string',
      values: [
        {
          name: 'enter',
        },
        {
          name: 'done',
        },
        {
          name: 'go',
        },
        {
          name: 'next',
        },
        {
          name: 'previous',
        },
        {
          name: 'search',
        },
        {
          name: 'send',
        },
      ],
      defaultValue: {name: 'done'},
    },
    {
      name: 'selection-start',
      description:
        'Vị trí bắt đầu khi select nội dung trong input. Chỉ có hiệu lực trong input đang được focus.',
      valueType: 'number',
    },
    {
      name: 'selection-end',
      description:
        'Vị trí kết thúc khi select nội dung trong input. Chỉ có hiệu lực khi đang được focus và cần sử dụng chung với selection-start.',
      valueType: 'number',
    },
    {
      name: 'cursor',
      description: 'Vị trí bắt đầu của con trỏ khi đang được focus.',
      valueType: 'number',
    },
    {
      name: 'controlled',
      description:
        'Nếu giá trị là true, nội dung value của input sẽ được điều khiển hoàn toàn thông qua hàm setData trong file js.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'onInput',
      description:
        'Sự kiện sẽ được kích hoạt khi nội dung của input bị thay đổi.',
      valueType: 'function',
    },
    {
      name: 'onConfirm',
      description: 'Sự kiện sẽ được kích hoạt khi nhấn nút submit.',
      valueType: 'function',
    },
    {
      name: 'onFocus',
      description: 'Sự kiện sẽ được kích hoạt khi input được focus.',
      valueType: 'function',
    },
    {
      name: 'onBlur',
      description: 'Sự kiện sẽ được kích hoạt khi input không được focus.',
      valueType: 'function',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/input',
    },
  ],
} as TagData;
