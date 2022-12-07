import {TagData} from '../types';

export default {
  name: 'checkbox-group',
  description: {
    kind: 'markdown',
    value:
      'Component checkbox-group dùng để nhóm các Component checkbox.\n\n`Lưu ý: Các component checkbox bên trong component checkbox-group cần được khai báo thuộc tính value.`',
  },
  attributes: [
    {
      name: 'name',
      description:
        'Khai báo name khi được sử dụng trong component form, được sử dụng để lấy value cho component form.',
      valueType: 'string',
    },
    {
      name: 'onChange',
      description:
        'Sự kiện được gọi khi giá trị của các component checkbox bên trong bị thay đổi.',
      valueType: 'function',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/checkbox-group',
    },
  ],
} as TagData;
