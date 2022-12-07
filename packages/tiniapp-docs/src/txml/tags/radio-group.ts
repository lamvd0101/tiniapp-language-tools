import {TagData} from '../types';

export default {
  name: 'radio-group',
  description: {
    kind: 'markdown',
    value:
      'Component radio-group dùng để nhóm các component radio lại với nhau. Bên trong component radio-group có thể chứa nhiều component radio, nhưng tại một thời điểm chỉ có một component radio có thể được chọn, các component radio cần khai báo thuộc tính value.',
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
        'Sự kiện được gọi khi giá trị của các component ratio bên trong bị thay đổi.',
      valueType: 'function',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/radio-group',
    },
  ],
} as TagData;
