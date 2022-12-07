import {TagData} from '../types';

export default {
  name: 'game-view',
  description: {
    kind: 'markdown',
    value:
      'Component game-view là một container component, được tối ưu hoá cho việc chạy các HTML5 game, hay còn biết đến với cái tên rút gọn H5 game.\n\n`Lưu ý: Nhằm đáp ứng nhu cầu rất lớn về phát hành game của các đối tác trên nền tảng Tini App, component game-view đã được xây dựng từ web-view như một giải pháp tạm thời. Tuy nhiên, component game-view sẽ sớm đổi thành native. Mỗi page của Tini App chỉ có thể chứa một component game-view duy nhất và nó mặc nhiên chiếm trọn màn hình. Khi hoạt động, component game-view sẽ tự động load tập tin index.html trong thư mục public.`',
  },
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/view-container/gameview',
    },
  ],
} as TagData;
