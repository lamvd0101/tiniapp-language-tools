import {TagData} from '../types';

export default {
  name: 'rich-text',
  description: {
    kind: 'markdown',
    value:
      'Component rich-text dùng để hiển thị nội dung cho HTML dưới dạng các node. Component rich-text không hỗ trợ render toàn bộ các thẻ HTML, mà chỉ hỗ trợ một số thẻ HTML và một số thuộc tính. Một số CSS selector theo tag name sẽ không được hỗ trợ (Ví dụ div { color: red }), do đó nên sử dụng inline style trong trường hợp này.\n\n`Lưu ý: Component rich-text chỉ hỗ trợ hiển thị html dưới dạng nodes, cài đặt package @tiki.vn/mini-html-parser2 để convert html string qua nodes.`',
  },
  attributes: [
    {
      name: 'nodes',
      description: 'Mảng các node để hiển thị.',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/basic/rich-text',
    },
  ],
} as TagData;
