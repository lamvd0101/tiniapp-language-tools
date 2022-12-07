import {TagData, ValueData} from '../types';

const typeValues: ValueData[] = [
  {name: 'home'},
  {name: 'search'},
  {name: 'calendar'},
  {name: 'location'},
  {name: 'setting'},
  {name: 'contact'},
  {name: 'chat'},
  {name: 'info'},
  {name: 'warning'},
  {name: 'success'},
  {name: 'plus'},
  {name: 'minus'},
  {name: 'geometry'},
  {name: 'close'},
  {name: 'close_circle'},
  {name: 'more'},
  {name: 'arrow_right'},
  {name: 'arrow_left'},
  {name: 'arrow_down'},
  {name: 'arrow_up'},
  {name: 'bookmark'},
  {name: 'app_home'},
  {name: 'phone_home'},
  {name: 'share'},
  {name: 'warning_glyph'},
  {name: 'success_glyph'},
  {name: 'close_glyph'},
];

export default {
  name: 'icon',
  description: {
    kind: 'markdown',
    value: 'Component icon dùng để hiển thị icon có sẵn trong Tini App.',
  },
  attributes: [
    {
      name: 'type',
      description: 'Loại icon hiển thị.',
      required: true,
      valueType: 'string',
      values: typeValues,
    },
    {
      name: 'size',
      description: 'Kích thước icon. Đơn vị tính pixel.',
      valueType: 'number',
      defaultValue: {name: '24'},
    },
    {
      name: 'color',
      description: 'Màu của icon, sử dụng mã màu như trong CSS.',
      valueType: 'string',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/basic/icon',
    },
  ],
} as TagData;
