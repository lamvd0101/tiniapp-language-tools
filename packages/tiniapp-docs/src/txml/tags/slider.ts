import {TagData} from '../types';

export default {
  name: 'slider',
  description: {
    kind: 'markdown',
    value:
      'Component slider cho phép bạn chọn giá trị bằng việc kéo thả trong một phạm vi nhất định.',
  },
  attributes: [
    {
      name: 'name',
      description:
        'Khai báo name khi được sử dụng trong component form, được sử dụng để lấy value cho component form.',
      valueType: 'string',
    },
    {
      name: 'value',
      description: 'Giá trị hiện tại của slider.',
      valueType: 'number',
      defaultValue: {name: '0'},
    },
    {
      name: 'min',
      description: 'Giá trị nhỏ nhất của slider.',
      valueType: 'number',
      defaultValue: {name: '0'},
    },
    {
      name: 'max',
      description: 'Giá trị lớn nhất của slider.',
      valueType: 'number',
      defaultValue: {name: '100'},
    },
    {
      name: 'step',
      description:
        'Chỉ định mỗi lần tăng/giảm bao nhiêu đơn vị, step phải lớn hơn 0 và là số được chia hết bởi max và min.',
      valueType: 'number',
      defaultValue: {name: '1'},
    },
    {
      name: 'disabled',
      description: 'Vô hiệu hoá component slider.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'show-tooltip',
      description: 'Hiển thị tooltip.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'true'},
    },
    {
      name: 'active-color',
      description: 'Màu của thanh giá trị đang được active.',
      valueType: 'string',
      defaultValue: {name: '#1A94FF'},
    },
    {
      name: 'background-color',
      description: 'Màu của nền của slider.',
      valueType: 'string',
      defaultValue: {name: 'rgba(0, 0, 0 , 0.1)'},
    },
    {
      name: 'handle-color',
      description: 'Màu của nền của vòng tròn toggle.',
      valueType: 'string',
      defaultValue: {name: '#FFFFFF'},
    },
    {
      name: 'track-size',
      description: 'Kích thước của thanh đang được active.',
      valueType: 'number',
      defaultValue: {name: '8'},
    },
    {
      name: 'handle-size',
      description: 'Kích thước của vòng tròn toggle.',
      valueType: 'number',
      defaultValue: {name: '24'},
    },
    {
      name: 'rail-size',
      description: 'Kích thước của vòng thanh slider.',
      valueType: 'number',
      defaultValue: {name: '4'},
    },
    {
      name: 'controlled',
      description:
        'Khi giá trị là true, giá trị của slider sẽ được điều khiển hoàn toàn thông qua hàm setData trong file js.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'onChange',
      description:
        'Sự kiện được gọi khi giá trị bị thay đổi và người dùng đã không còn chạm vào slider.',
      valueType: 'function',
    },
    {
      name: 'onChanging',
      description:
        'Sự kiện được gọi khi giá trị bị thay đổi và người dùng vẫn còn chạm vào slider.',
      valueType: 'function',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/slider',
    },
  ],
} as TagData;
