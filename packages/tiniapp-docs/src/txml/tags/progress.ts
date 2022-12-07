import {TagData} from '../types';

export default {
  name: 'progress',
  description: {
    kind: 'markdown',
    value: 'Component progress dùng để hiển thị thanh tiến trình.',
  },
  attributes: [
    {
      name: 'percent',
      description: 'Hiển thị phần trăm progress. Giá trị từ 0 tới 100.',
      valueType: 'number',
      defaultValue: {name: '0'},
    },
    {
      name: 'show-info',
      description: 'Hiển thị phần trăm ở bên phải thanh progress.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'stroke-width',
      description: 'Kích thước thanh progress.',
      valueType: 'number',
      defaultValue: {name: '4'},
    },
    {
      name: 'active-color',
      description: 'Màu của thanh phần trăm hiển thị.',
      valueType: 'string',
      defaultValue: {name: '--brand'},
    },
    {
      name: 'background-color',
      description: 'Màu của toàn bộ thanh progress.',
      valueType: 'string',
      defaultValue: {name: '--background-progress-inactive'},
    },
    {
      name: 'active',
      description: 'Sử dụng animation cho thanh progress.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/basic/progress',
    },
  ],
} as TagData;
