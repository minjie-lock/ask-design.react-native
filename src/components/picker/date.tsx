import Picker, { PickerItem, PickerProps } from '.';
import day from 'dayjs';
import 'dayjs/locale/zh-cn';
day.locale('zh-cn');

const precisions = {
  'year': 0,
  'month': 1,
  'day': 2,
  'hour': 3,
  'minute': 4,
  'second': 5,
  'week': 6,
  'week-day': 7,
  'quarter': 8,
} as const;

type DateProps<T extends keyof typeof precisions> = {
  /**
   * 精度
   */
  precision?: T;
} & Omit<PickerProps<[]>, 'items'>;


/**
 * @function Picker.Date
 * @description 时间选择
 * @author Lock
 * @param {DateProps} props 组件参数
 * @returns {React.ReactNode}
 */
export default function Date<T extends keyof typeof precisions>
  (props: DateProps<T>): React.ReactNode {

  const {
    precision = 'day',
    ...rest
  } = props;

  const date: Record<keyof typeof precisions, () => {
    items: PickerItem[][];
    onSelect: (value: PickerItem) => void;
  }> = {
    year: () => {
      day().format('YYY-MMM-DD HH:mm:ss');
      const years = Array.from({ length: 20 })?.map(
        (...[, index]) => ({
          label: day().subtract(index, 'year').year(),
          value: day().subtract(index, 'year').year(),
          key: index,
        })
      );
      return {
        items: [
          years,
        ],
        onSelect: () => {

        },
      };
    },
    month() {
      const years = this.year()?.items?.at(0) ?? [];
      const months = Array.from({ length: 12 })?.map(
        (...[, index]) => ({
          label: day().month(index).format('MMM'),
          value: day().month(index).format('MMM'),
          key: index,
        })
      );
      return {
        items: [
          years,
          months,
        ],
        onSelect: (value) => {
          console.log(value);
        },
      };
    },
    day() {

      const years = this.year()?.items?.at(0) ?? [];
      const months = this.month()?.items?.at(1) ?? [];
      const days = [];
      return {
        items: [
          years,
          months,
          days,
        ],
        onSelect: (value) => {
          console.log(value.value);
          const days = day(value?.value).daysInMonth();
          console.log(days);
        },
      };
    },
    hour: () => {
      return [];
    },
    minute: () => {
      return [];
    },
    second: () => {
      return [];
    },
    week: () => {
      return [];
    },
    'week-day': () => {
      return [];
    },
    quarter: () => {
      return [];
    },
  };

  const { items, onSelect } = date?.[precision]?.();

  return (
    <Picker
      {...rest}
      onSelect={onSelect}
      items={items}
    />
  );
}
