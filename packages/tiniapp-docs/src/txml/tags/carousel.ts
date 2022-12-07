import {TagData} from '../types';

export default {
  name: 'carousel',
  description: {
    kind: 'markdown',
    value:
      'Component carousel là một container component cho phép bạn tổ chức các phần tử hay còn gọi là item (Hình ảnh, video, text, …) theo dạng băng chuyền. Mỗi lần, một hoặc vài item được hiển thị. Người dùng có thể trượt (Slide) qua trái/phải đối với component carousel ngang, hoặc trượt lên/xuống đối với component carousel đứng để (Tuần tự) xem những item khác. Ngoài ra component carousel còn có chế độ trượt tự động - cứ sau một khoảng thời gian, component carousel sẽ mặc nhiên trượt đến item tiếp theo.',
  },
  attributes: [
    {
      name: 'arrows',
      description: 'Hiển thị previous và next arrows.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'indicator-dots',
      description: 'Cho phép hiển thị dot indicator.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'indicator-color',
      description: 'Màu sắc của dot indicator.',
      valueType: 'string',
      defaultValue: {name: 'gray-20'},
    },
    {
      name: 'indicator-active-color',
      description: 'Màu sắc của dot indicator đang được active.',
      valueType: 'string',
      defaultValue: {name: 'brand'},
    },
    {
      name: 'active-class',
      description:
        'Thuộc tính này sẽ thêm một lớp (Được định nghĩa trong TCSS) cho item đang active.',
      valueType: 'string',
    },
    {
      name: 'current',
      description:
        'Cho biết item thứ mấy của component carousel đang active (Được hiển thị). Các item được đánh số bắt đầu từ 0.',
      valueType: 'number',
      defaultValue: {name: '0'},
    },
    {
      name: 'autoplay',
      description: 'Tự động trượt qua các phần tử.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'interval',
      description:
        'Thời gian hiển thị một item trước carousel khi trượt qua item tiếp theo. Đơn vị tính ms.',
      valueType: 'number',
      defaultValue: {name: '5000'},
    },
    {
      name: 'duration',
      description: 'Thời gian diễn ra hiệu ứng đổi item. Đơn vị tính ms.',
      valueType: 'number',
      defaultValue: {name: '500'},
    },
    {
      name: 'vertical',
      description:
        'Component carousel đứng, trượt theo chiều dọc. Cần khai báo chiều cao cho component carousel thông qua thuộc tính height ở style hoặc class.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'circular',
      description: 'Quy định component carousel trượt xoay vòng.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'disable-touch',
      description:
        'Cho phép có thể touch được vào component carousel để lướt hay không.',
      valueType: 'boolean',
      values: [{name: 'true'}, {name: 'false'}],
      defaultValue: {name: 'false'},
    },
    {
      name: 'spacing',
      description:
        'Khoảng cách giữa các item (Đơn vị tính pixel). Chỉ hỗ trợ từ version 1.74.23.',
      valueType: 'number',
      defaultValue: {name: '0'},
    },
    {
      name: 'onChange',
      description:
        'Sự kiện được kích hoạt khi trượt từ item này sang item khác.',
      valueType: 'event',
    },
  ],
  references: [
    {
      name: 'Tini App Reference',
      url: 'https://developers.tiki.vn/docs/component/basic/view-container/carousel',
    },
  ],
} as TagData;
