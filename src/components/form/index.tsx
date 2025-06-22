// import { createContext } from 'react';
// import type { FormProps } from './type';
import { useMount } from 'ahooks';
import IForm, { FormProps as IFromProps, useForm } from 'rc-field-form';
import { lazy } from 'react';
import { FormProps } from './type';

// export const FormContext = createContext();


/**
 * @function Form
 * @description 表单
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function Form<T>(props: FormProps<T>): React.ReactNode {

  const {
    children,
    form: iform,
    ref,
    ...rest
  } = props;

  const [form] = useForm<T>();

  // 判断是否传入 form 属性
  // useMount(() => {
  //   form = iform || form;
  // });

  return (
    <IForm ref={ref} form={form}>
      {children}
    </IForm>
  );
}


Form.Field = lazy(() => import('./field'));
// Form.useForm = IForm.useForm;
