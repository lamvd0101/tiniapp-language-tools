import {TagData} from '../types';

export default {
  name: 'movable-area',
  description: {
    kind: 'markdown',
    value:
      'Component movable-area là thành phần quy định phạm vi di chuyển của các component movable-view nằm trong nó.',
  },
  attributes: [
    {
      name: 'scale-area',
      description:
        'Khi các component movable-view cho phép scaling. Thuộc tính để bật/tắt scaling của tất cả component ở trong area.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/view-container/movable-area',
    },
  ],
} as TagData;
