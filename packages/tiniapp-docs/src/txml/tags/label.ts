import {TagData} from '../types';

export default {
  name: 'label',
  description: {
    kind: 'markdown',
    value:
      'Để tăng trải nghiệm với component form, các thành phần bên trong label sẽ được focus khi bấm vào phạm vi của label. Hỗ trợ các component radio, checkbox, input và switch. Nếu có nhiều component trong label chỉ component đầu tiên được focus.',
  },
  attributes: [],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/label',
    },
  ],
} as TagData;
