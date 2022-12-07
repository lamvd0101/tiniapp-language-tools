import {TagData} from '../types';

export default {
  name: 'text',
  description: {
    kind: 'markdown',
    value:
      'Component text dùng để hiển thị nội dung văn bản, và phải nằm trong các component khác. Component text có những đặc điểm như sau:\n\n- Có thể đặt lồng vào nhau.\n\n- Hỗ trợ styling.\n\n- Các component text gần nhau được trình bày trên cùng một hàng. Nếu muốn xuống hàng, bạn có thể dùng `\\n`.',
  },
  attributes: [
    {
      name: 'selectable',
      description: 'Có cho phép người dùng select text không.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'space',
      description: 'Kích thước khoảng trắng.',
      valueType: 'string',
      values: [
        {
          name: 'nbsp',
          description: 'Khoảng trắng có kích thước theo font quy định.',
        },
        {
          name: 'ensp',
          description:
            'Viết tắt của en space. Khoảng trắng có kích thước bằng phân nửa chiều ngang ký tự.',
        },
        {
          name: 'emsp',
          description:
            'Viết tắt của em space. Khoảng trắng có kích thước bằng chiều ngang ký tự.',
        },
      ],
    },
    {
      name: 'decode',
      description: 'Có decode text hay không.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'number-of-lines',
      description:
        'Số dòng tối đa mà text có thể hiển thị. Phần nội dung dư ra sẽ được đại diện bằng dấu ba chấm (…). Nhận giá trị lớn hơn hay bằng 1.',
      valueType: 'number',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/basic/text',
    },
  ],
} as TagData;
