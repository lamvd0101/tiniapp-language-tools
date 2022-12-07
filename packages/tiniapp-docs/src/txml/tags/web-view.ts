import {TagData} from '../types';

export default {
  name: 'web-view',
  description: {
    kind: 'markdown',
    value:
      'Component web-view là một container component dùng để hiển thị trang web trong một Tini App. Mỗi page của Tini App chỉ được phép chứa một component web-view duy nhất. Component web-view sẽ tự động chiếm toàn màn hình; tất cả các component khác sẽ bị che bởi component web-view đó. Bạn cần có tài khoản nhà phát triển loại công ty để có thể khai thác đầy đủ tính năng của component web-view.\n\n`Lưu ý: Bạn cần phải thêm tên miền trong phần cài đặt chung của ứng dụng trên Tini Console trước khi sử dụng các Networking API và component web-view. Xem phần hướng dẫn tại đây.`',
  },
  attributes: [
    {
      name: 'src',
      description: 'Đường dẫn đến trang web cần hiển thị.',
      required: true,
      valueType: 'string',
    },
    {
      name: 'progress',
      description: 'Trạng thái tiến trình tải trang web.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'true'},
    },
    {
      name: 'progressHeight',
      description: 'Chiều cao của thanh tiến trình tải trang web.',
      valueType: 'number',
      defaultValue: {name: '3'},
    },
    {
      name: 'progressColor',
      description: 'Màu sắc của thanh tiến trình tải trang web.',
      valueType: 'string',
      defaultValue: {name: '#1A94FF'},
    },
    {
      name: 'onMessage',
      description: 'Được gọi khi có sự kiện được gửi từ component web-view.',
      valueType: 'event',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/view-container/webview',
    },
  ],
} as TagData;
