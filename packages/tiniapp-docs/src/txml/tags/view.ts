import {TagData} from '../types';

export default {
  name: 'view',
  description: {
    kind: 'markdown',
    value:
      'Component view là một container component dùng để chứa các component khác, có chức năng tự với thẻ div trong HTML.',
  },
  attributes: [
    {
      name: 'hidden',
      description: 'Ẩn đi hay hiển thị component view.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'animation',
      description:
        'Dùng để điều khiển animation của component view. Xem thêm my.createAnimation.',
      valueType: 'object',
      defaultValue: {name: '{}'},
      references: [
        {
          name: 'Tini App Reference',
          url: 'https://developers.tiki.vn/docs/api/ui/animation',
        },
      ],
    },
    {
      name: 'onTap',
      description:
        'Sự kiện được kích hoạt khi người dùng tap vào vùng hiển thị của component view.',
      valueType: 'event',
    },
    {
      name: 'onTouchStart',
      description:
        'Sự kiện được kích hoạt khi người dùng bắt đầu touch vào vùng hiển thị của component view.',
      valueType: 'event',
    },
    {
      name: 'onTouchMove',
      description:
        'Sự kiện được kích hoạt khi người dùng di chuyển ngón tay trên màn hình sau hành động touch.',
      valueType: 'event',
    },
    {
      name: 'onTouchEnd',
      description:
        'Sự kiện được kích hoạt khi người dùng rút ngón tay ra khỏi màn hình.',
      valueType: 'event',
    },
    {
      name: 'onTouchCancel',
      description:
        'Sự kiện được kích hoạt khi touch bị gián đoạn; ví dụ có cuộc gọi hoặc popup hiển thị.',
      valueType: 'event',
    },
    {
      name: 'onTouchCancel',
      description:
        'Sự kiện được kích hoạt khi touch bị gián đoạn. Ví dụ có cuộc gọi hoặc popup hiển thị.',
      valueType: 'event',
    },
    {
      name: 'onLongTap',
      description:
        'Sự kiện được kích hoạt khi người tap vào vùng hiển thị của component view và giữ lâu hơn 500ms.',
      valueType: 'event',
    },
    {
      name: 'onTransitionEnd',
      description: 'Sự kiện được kích hoạt khi hoàn thành một CSS Transition.',
      valueType: 'event',
    },
    {
      name: 'onAnimationStart',
      description: 'Sự kiện được kích hoạt khi bắt đầu một CSS Animation.',
      valueType: 'event',
    },
    {
      name: 'onAnimationEnd',
      description: 'Sự kiện được kích hoạt khi kết thúc một CSS Animation.',
      valueType: 'event',
    },
    {
      name: 'onAnimationIteration',
      description:
        'Sự kiện được kích hoạt mỗi lần kết thúc một vòng lặp CSS Animation.',
      valueType: 'event',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/view-container/view',
    },
  ],
} as TagData;
