import {TagData} from '../types';

export default {
  name: 'recycle-view',
  description: {
    kind: 'markdown',
    value:
      'Component recycle-view dùng để hiển thị một danh sách dữ liệu lớn. Nó giúp tối ưu performance bằng cách chỉ render một số lượng các item cần thiết trong phạm vi nhìn thấy của người dùng. Nó có height mặc định là window height, bạn có thể thay đổi thông qua style của recycle-view. Component recycle-view được phân làm hai loại grid view và list view, mỗi loại đều có các thuộc tính riêng:\n\n- Grid view hiển thị nhiều item trên mỗi dòng. Số lượng item trên mỗi dòng thì đồng nhất.\n\n- List view hiển thị một item trên một dòng.\n\n`Lưu ý: Component recycle-view đang trong giai đoạn phát triển, chưa phải là bản chính thức nên có thể sẽ có lỗi phát sinh trong quá trình sử dụng.`',
  },
  attributes: [
    {
      name: 'totalCount',
      description: 'Tổng số lượng các phần tử có trong mảng.',
      required: true,
      valueType: 'string',
    },
    {
      name: 'isGrid',
      description:
        'Chỉ định hiển thị view dưới dạng grid, có thể có nhiều phần tử trên 1 dòng.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'hasPlaceholder',
      description:
        'Khi scroll quá nhanh có thể sẽ bị hiển thị trắng màn hình do quá trình tính toán, có thể dùng placeholder để hiển thị thay vùng trắng đó. Bắt buộc phải dùng chung với component <recycle-placeholder>.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'hasLoading',
      description:
        'Do recycle-view sử dụng cơ chế lazy load, nên có thể mất một khoảng thời gian để khởi tạo component, có thể dùng loading để hiển thị trong lúc chờ component được load xong. Bắt buộc phải dùng chung với component <recycle-loading>.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'onReady',
      description: 'Sự kiện được gọi khi recycle-view được khởi tạo xong.',
      valueType: 'event',
    },
    {
      name: 'onEndReached',
      description:
        'Sự kiện được gọi khi scroll tới vị trí của phần tử cuối cùng trong danh sách.',
      valueType: 'event',
    },
    {
      name: 'onScrolling',
      description: 'Sự kiện được gọi khi đang scroll.',
      valueType: 'event',
    },
    {
      name: 'onRangeChanged',
      description:
        'Sự kiện được gọi khi các phần tử trong phạm vi hiển thị bị thay đổi.',
      valueType: 'event',
    },
    // List view
    {
      name: 'initialTopMostItemIndex',
      description:
        'Vị trí của phần tử được xuất hiện đầu tiên, chỉ có tác dụng ở lần đầu khi list được hiển thị, khi thay đổi giá trị này list sẽ không tự động scroll tới. Mặc định là 0, giá trị trong khoảng từ 0 tới totalCount.',
      valueType: 'number',
      defaultValue: {name: '0'},
    },
    // Grid view
    {
      name: 'itemClassName',
      description: 'Class cho mỗi item trong grid.',
      valueType: 'string',
    },
    {
      name: 'listClassName',
      description: 'Class cho wrapper của các item.',
      valueType: 'string',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/view-container/recycle-view',
    },
  ],
} as TagData;
