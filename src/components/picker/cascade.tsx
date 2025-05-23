/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useMemo, useState } from 'react';
import Picker, { PickerItem } from '.';
import { useControllableValue } from '../../hooks';


export type CascadeState<T extends readonly CascadeItem[]> =
  T extends readonly (infer R)[]
  ? R extends { value: infer V; children?: infer C }
  ? C extends readonly CascadeItem[]
  ? [V, ...CascadeState<C>] // 继续递归展开 `children`
  : [V] // 没有 `children` 时，仍然作为数组项存在
  : never
  : never;



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
}

/**
 * @function Cascade
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

  console.log(value);

  const [options, setOptions] = useState<PickerItem[][]>([]);
  // const [selected, setSelected] = useState<PickerValue[]>([]);

  // 初始化选项
  useEffect(() => {
    if (items?.length) {
      setOptions([
        items as unknown as PickerItem[],
        (items[0].children ?? []) as PickerItem[],
      ]);
    }
  }, [items]);


  const flattenItems = useMemo(() => {
    const deep = (items: CascadeItem[]) => {
      const result: CascadeItem[] = [];
      items?.forEach(item => {
        result.push(item);
        if (item.children) {
          result.push(...deep(item.children as CascadeItem[]));
        }
      });
      return result;
    };
    return deep((items ?? []) as CascadeItem[]);
  }, [items]);

  // 替换选项
  const onSelect = (current: string | number) => {
    const latest: PickerItem[][] = [];
    // 寻找当前项
    const one = flattenItems?.find((item) => {
      return item.value === current;
    });
    // 寻找寻找当前项
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

