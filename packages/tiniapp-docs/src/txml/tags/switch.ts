import {TagData} from '../types';

export default {
  name: 'switch',
  description: {
    kind: 'markdown',
    value:
      'Component switch hoạt động như một công tắc giúp người dùng chuyển đổi giữa hai trạng thái on/off.',
  },
  attributes: [
    {
      name: 'name',
      description:
        'Khai báo name khi được sử dụng trong component form, được sử dụng để lấy value cho component form.',
      valueType: 'string',
    },
    {
      name: 'checked',
      description: 'Chỉ định giá trị của switch có được chọn hay không.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'disabled',
      description: 'Vô hiệu hoá component switch.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'color',
      description: 'Màu của component, sử dụng mã màu như trong CSS.',
      valueType: 'string',
    },
    {
      name: 'onChange',
      description: 'Sự kiện được gọi khi giá trị bị thay đổi.',
      valueType: 'function',
    },
    {
      name: 'controlled',
      description:
        'Khi giá trị là true, giá trị của slider sẽ được điều khiển hoàn toàn thông qua hàm setData trong file js.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/form/switch',
    },
  ],
} as TagData;
