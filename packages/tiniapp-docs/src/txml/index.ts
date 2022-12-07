// Tags
import ad from './tags/ad';
import button from './tags/button';
import carousel from './tags/carousel';
import carouselItem from './tags/carousel-item';
import checkbox from './tags/checkbox';
import checkboxGroup from './tags/checkbox-group';
import form from './tags/form';
import gameView from './tags/game-view';
import icon from './tags/icon';
import input from './tags/input';
import label from './tags/label';
import movableArea from './tags/movable-area';
import movableView from './tags/movable-view';
import picker from './tags/picker';
import pickerView from './tags/picker-view';
import pickerViewColumn from './tags/picker-view-column';
import progress from './tags/progress';
import radio from './tags/radio';
import radioGroup from './tags/radio-group';
import recycleFooter from './tags/recycle-footer';
import recycleItem from './tags/recycle-item';
import recycleLoading from './tags/recycle-loading';
import recyclePlaceholder from './tags/recycle-placeholder';
import recycleView from './tags/recycle-view';
import richText from './tags/rich-text';
import scrollView from './tags/scroll-view';
import slider from './tags/slider';
import switchComp from './tags/switch';
import text from './tags/text';
import textarea from './tags/textarea';
import view from './tags/view';
import webView from './tags/web-view';
// Types
import type {AttributeData, TagData, TXMLData, ValueSet} from './types';
export * from './types';

const tags: TagData[] = [
  ad,
  button,
  carousel,
  carouselItem,
  checkbox,
  checkboxGroup,
  form,
  gameView,
  icon,
  input,
  label,
  movableArea,
  movableView,
  picker,
  pickerView,
  pickerViewColumn,
  progress,
  radio,
  radioGroup,
  recycleFooter,
  recycleItem,
  recycleLoading,
  recyclePlaceholder,
  recycleView,
  richText,
  scrollView,
  slider,
  switchComp,
  text,
  textarea,
  view,
  webView,
];

const globalAttributes: AttributeData[] = [
  {
    name: 'id',
    description: 'Mã của component.',
    valueType: 'string',
  },
  {
    name: 'class',
    description: 'Custom class cho component.',
    valueType: 'string',
  },
  {
    name: 'style',
    description: 'Custom style cho component.',
    valueType: 'string',
  },
  // Tiki condition
  {
    name: 'tiki:if',
    description: 'Xác định điều kiện render một block.',
    valueType: 'interpolation',
    references: [
      {
        name: 'Tini App Reference',
        url: 'https://developers.tiki.vn/docs/framework/txml/conditional-rendering',
      },
    ],
  },
  {
    name: 'tiki:elif',
    description: 'Thêm điều kiện render một block.',
    valueType: 'interpolation',
    references: [
      {
        name: 'Tini App Reference',
        url: 'https://developers.tiki.vn/docs/framework/txml/conditional-rendering',
      },
    ],
  },
  {
    name: 'tiki:else',
    description: 'Kết thúc điều kiện render một block.',
    valueType: 'empty',
    references: [
      {
        name: 'Tini App Reference',
        url: 'https://developers.tiki.vn/docs/framework/txml/conditional-rendering',
      },
    ],
  },
  // Tiki for-loop
  {
    name: 'tiki:for',
    description: 'Sử dụng một mảng dữ liệu để render.',
    valueType: 'interpolation',
    references: [
      {
        name: 'Tini App Reference',
        url: 'https://developers.tiki.vn/docs/framework/txml/list-rendering',
      },
    ],
  },
  {
    name: 'tiki:for-index',
    description: 'Thay thế tên mặc định index cho vòng lặp for.',
    valueType: 'string',
    references: [
      {
        name: 'Tini App Reference',
        url: 'https://developers.tiki.vn/docs/framework/txml/list-rendering',
      },
    ],
  },
  {
    name: 'tiki:for-item',
    description: 'Thay thế tên mặc định item cho vòng lặp for.',
    valueType: 'string',
    references: [
      {
        name: 'Tini App Reference',
        url: 'https://developers.tiki.vn/docs/framework/txml/list-rendering',
      },
    ],
  },
  {
    name: 'tiki:key',
    description: 'Định danh các phần tử trong mảng.',
    valueType: 'string',
    references: [
      {
        name: 'Tini App Reference',
        url: 'https://developers.tiki.vn/docs/framework/txml/list-rendering',
      },
    ],
  },
];

const valueSets: ValueSet[] = [];

export const txmlData: TXMLData = {
  tags,
  globalAttributes,
  valueSets,
};
