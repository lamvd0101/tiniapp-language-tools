import {TagData} from '../types';

export default {
  name: 'checkbox',
  description: {
    kind: 'markdown',
    value:
      'Component checkbox cho phép người dùng chọn một hoặc nhiều phương án.',
  },
  attributes: [
    {
      name: 'name',
      description:
        'Tên của component checkbox khi được sử dụng trong component form, được sử dụng để lấy value cho component form',
      valueType: 'string',
    },
    {
      name: 'value',
      description:
        'Giá trị của checkbox. Cần được khai báo khi sử dụng bên trong component checkbox-group.',
      valueType: 'string',
    },
    {
      name: 'checked',
      description: 'Quy định checkbox có được mặc định chọn hay không.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'disabled',
      description: 'Vô hiệu hoá component checkbox.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'color',
      description: 'Màu của component checkbox. sử dụng mã màu như trong CSS.',
      valueType: 'string',
    },
    {
      name: 'icon',
      description: 'Loại icon hiển thị khi checkbox được chọn.',
      valueType: 'string',
      values: [{name: 'success'}, {name: 'minus'}],
      defaultValue: {name: 'success'},
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
      url: 'https://developers.tiki.vn/docs/component/basic/form/checkbox',
    },
  ],
} as TagData;
