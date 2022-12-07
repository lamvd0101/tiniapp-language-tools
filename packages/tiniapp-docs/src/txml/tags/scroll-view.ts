import {TagData} from '../types';

export default {
  name: 'scroll-view',
  description: {
    kind: 'markdown',
    value:
      'Component scroll-view là một container component có thể scroll được.',
  },
  attributes: [
    {
      name: 'scroll-x',
      description: 'Cho phép scroll theo chiều ngang.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'scroll-y',
      description: 'Cho phép scroll theo chiều dọc.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'scroll-top',
      description: 'Giá trị khởi tạo vị trí của thanh scroll dọc.',
      valueType: 'number',
      defaultValue: {name: '0'},
    },
    {
      name: 'scroll-left',
      description: 'Giá trị khởi tạo vị trí của thanh scroll ngang.',
      valueType: 'number',
      defaultValue: {name: '0'},
    },
    {
      name: 'scroll-into-view',
      description:
        'Scroll tới phần tử con với id bằng với giá trị của scroll-into-view. Giá trị của scroll-into-view được ưu tiên hơn scroll-top và scroll-left. scroll-into-view chỉ áp dụng cho component view.',
      valueType: 'string',
    },
    {
      name: 'scroll-with-animation',
      description: 'Sử dụng animation khi scroll.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'trap-scroll',
      description:
        'Khi thanh scroll đang ở trên cùng hoặc ở dưới cùng, thì hàm onScroll sẽ không được gọi. Thiết lập giá trị trap-scroll là true nếu bạn vẫn muốn onScroll được gọi.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'upper-threshold',
      description:
        'Khoảng cách từ top/left của scroll-view để kích hoạt hàm onScroll.',
      valueType: 'number',
      defaultValue: {name: '50'},
    },
    {
      name: 'lower-threshold',
      description:
        'Khoảng cách từ bottom/right của scroll-view để kích hoạt hàm onScroll.',
      valueType: 'number',
      defaultValue: {name: '50'},
    },
    {
      name: 'onScrollToUpper',
      description:
        'Sự kiện được gọi khi thanh scroll tới vị trí trên đầu hoặc ngoài cùng bên trái của scroll-view.',
      valueType: 'event',
    },
    {
      name: 'onScrollToLower',
      description:
        'Sự kiện được gọi khi thanh scroll tới vị trí dưới cùng hoặc ngoài cùng bên phải của scroll-view.',
      valueType: 'event',
    },
    {
      name: 'onScroll',
      description: 'Sự kiện được gọi khi đang scroll.',
      valueType: 'event',
    },
    {
      name: 'onTouchStart',
      description: 'Sự kiện được gọi khi bắt đầu chạm vào scroll-view.',
      valueType: 'event',
      references: [
        {
          name: 'Tini App Reference',
          url: 'https://developers.tiki.vn/docs/framework/event/event-object',
        },
      ],
    },
    {
      name: 'onTouchmove',
      description:
        'Sự kiện được gọi khi bạn di chuyển trong lúc chạm vào scroll-view.',
      valueType: 'event',
      references: [
        {
          name: 'Tini App Reference',
          url: 'https://developers.tiki.vn/docs/framework/event/event-object',
        },
      ],
    },
    {
      name: 'onTouchEnd',
      description: 'Sự kiện được gọi khi dừng chạm vào scroll-view.',
      valueType: 'event',
      references: [
        {
          name: 'Tini App Reference',
          url: 'https://developers.tiki.vn/docs/framework/event/event-object',
        },
      ],
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/view-container/scroll-view',
    },
  ],
} as TagData;
