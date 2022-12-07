import {TagData} from '../types';

export default {
  name: 'form',
  description: {
    kind: 'markdown',
    value:
      'Component form dùng để lưu trữ giá trị của các component: input, switch, checkbox, radio, picker. Các component bên trong component form cần khai báo thuộc tính name.',
  },
  attributes: [
    {
      name: 'onSubmit',
      description:
        'Sự kiện được gọi khi nhấn vào component button bên trong form với form-type="submit".',
      valueType: 'function',
    },
    {
      name: 'onReset',
      description:
        'Sự kiện được gọi khi nhấn vào component button bên trong form với form-type="reset".',
      valueType: 'function',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form',
    },
  ],
} as TagData;
