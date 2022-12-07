import {TagData} from '../types';

export default {
  name: 'movable-view',
  description: {
    kind: 'markdown',
    value:
      'Component movable-view là container component cho phép kéo và thả chính nó và các thành phần con trong nó trên page. Component movable-view bắt buộc phải nằm trong component movable-area. Nếu không, component movable-view không thể di chuyển được.',
  },
  attributes: [
    {
      name: 'direction',
      description: 'Các hướng mà thành phần có thể di chuyển được.',
      valueType: 'string',
      values: [
        {
          name: 'all',
        },
        {
          name: 'vertical',
        },
        {
          name: 'horizontal',
        },
        {
          name: 'none',
        },
      ],
      defaultValue: {name: 'none'},
    },
    {
      name: 'inertia',
      description: 'Component movable-view sẽ có quán tính sau khi thả ra.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'out-of-bounds',
      description:
        'Component movable-view có thể di chuyển ra ngoài movable-area.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'x',
      description:
        'Vị trí mặc định theo x-axis của view. Khi giá tị x nằm ngoài movable-area vị trí biên sẽ được sử dụng.',
      valueType: 'number',
    },
    {
      name: 'y',
      description:
        'Vị trí mặc định theo y-axis của view. Khi giá tị y nằm ngoài movable-area vị trí biên sẽ được sử dụng.',
      valueType: 'number',
    },
    {
      name: 'damping',
      description:
        'Khi thuộc tính out-of-bounds được bật, sau khi di chuyển ra ngoài movable-area sẽ có hiệu ứng bật ngược lại.',
      valueType: 'number',
      defaultValue: {name: '20'},
    },
    {
      name: 'friction',
      description:
        'Khi inertia được bật, thuộc tính này dùng để quy định gia tốc của view tiếp tục di chuyển sau khi thả ra.',
      valueType: 'number',
      defaultValue: {name: '2'},
    },
    {
      name: 'disabled',
      description: 'Tắt không cho view di chuyển.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'scale',
      description: 'Xác định cho phép view scale bằng 2 ngón tay.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'scale-min',
      description: 'Giá trị tối thiểu được scale.',
      valueType: 'number',
      defaultValue: {name: '0.5'},
    },
    {
      name: 'scale-max',
      description: 'Giá trị cực đại được scale.',
      valueType: 'number',
      defaultValue: {name: '0.5'},
    },
    {
      name: 'scale-value',
      description: 'Giá trị scale ban đầu.',
      valueType: 'number',
      defaultValue: {name: '1'},
    },
    {
      name: 'animation',
      description: 'Cho phép bật/tắt animation khi di chuyển.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'onChange',
      description: 'Sự kiện được kích hoạt khi view di chuyển.',
      valueType: 'event',
    },
    {
      name: 'onScale',
      description: 'Sự kiện được kích hoạt khi view được scale.',
      valueType: 'event',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/view-container/movable-view',
    },
  ],
} as TagData;
