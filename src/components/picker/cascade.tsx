/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useMemo, useState } from 'react';
import Picker, { PickerItem, PickerProps } from '.';
import { useControllableValue } from '@/hooks';


export type CascadeState<T extends readonly CascadeItem[]> =
  T extends readonly (infer R)[]
  ? R extends { value: infer V; children?: infer C }
  ? C extends readonly CascadeItem[]
  ? [V, ...CascadeState<C>] // 继续递归展开 `children`
  : [V] // 没有 `children` 时，仍然作为数组项存在
  : never
  : never;


type CascadeItemId = {
  id: number;
} & CascadeItem;



type CascadeItem = {
  label: string;
  value: string | number;
  key: string | number;
  children?: readonly CascadeItem[];
}


type CascadeProps<T extends readonly CascadeItem[]> = {
  /**
    * 默认值
    */
  defaultValue?: string[];
  /**
   * 值
   */
  value?: string[];
  /**
   * 变化回调
   */
  onChange?: (value: string[]) => void;
  /**
   * 项目
   */
  items?: T;
  /**
   * 打开
   */
  open?: boolean;
  /**
   * 关闭
   */
  onClose?: () => void;
} & Omit<PickerProps<PickerItem[][]>,
  'items' | 'value' | 'columns' | 'onSelect' | 'onChange' | 'defaultValue'
>;

/**
 * @function Picker.Cascade
 * @author Lock
 * @description 级联选择器
 * @param {CascadeProps} props
 * @returns {React.ReactNode}
 */
export default function Cascade<T extends readonly CascadeItem[]>
  (props: CascadeProps<T>): React.ReactNode {

  const {
    items,
    open,
    onClose,
  } = props;

  const [value, setValue] = useControllableValue({
    defaultValue: props.defaultValue,
    value: props?.value,
    onChange: props.onChange,
  });

  const [options, setOptions] = useState<PickerItem[][]>([]);

  const [idItems, flastIdItmes] = useMemo(() => {
    let id = 0;
    // 创建唯一索引
    const createId = (items: readonly CascadeItemId[]) => {
      return items?.map((item) => {
        item.id = id++;
        if (item.children) {
          item.children = createId(item?.children as CascadeItemId[]);
        }
        return item;
      });
    };

    const dataSource = createId((items ?? []) as CascadeItemId[]);
    // 拍平多维数组方面查找
    const flatten = (items: readonly CascadeItemId[]): readonly CascadeItemId[] => {
      const result = [];
      for (const item of items) {
        result.push(item);
        if (item.children?.length) {
          result.push(...flatten(item.children as CascadeItemId[]));
        }
      }
      return result;
    };

    return [dataSource, flatten(dataSource)];
  }, [items]);

  // 初始化选项
  useEffect(() => {
    if (idItems?.length) {
      setOptions([
        idItems as unknown as PickerItem[],
        (idItems[0].children ?? []) as PickerItem[],
      ]);
    }
  }, [idItems]);

  // const id = useRef(0);

  // 替换选项
  const onSelect = (current: PickerItem) => {
    const latest: PickerItem[][] = [];
    // 寻找当前项
    const one = flastIdItmes?.find((item) => {
      return item.value === current.key && item.id === (current as CascadeItemId).id;
    });
    // 寻找当前项的前置元素
    const latestOptions = options.findIndex((items) => {
      return items?.find((item) => item.value === one?.value);
    });
    // 保留前置元素
    const first = options?.slice(
      0, latestOptions + 1,
    );
    if (one?.children) {
      // 有子级添加子级
      latest.push(
        ...first,
        one?.children as PickerItem[],
      );
      if (latestOptions >= 1 && one?.children?.[0]?.children) {
        latest.push(
          one?.children?.[0]?.children as PickerItem[]
        );
      }
    } else {
      latest.push(
        ...first,
      );
    }
    setOptions([...latest]);
    setValue(
      latest?.map((items) => items?.[0]?.value)
    );
  };

  return (
    <Picker
      columns={4}
      open={open}
      onClose={onClose}
      value={value as unknown as string[]}
      onSelect={onSelect}
      items={options}
    />
  );
}

