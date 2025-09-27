// import { createContext } from 'react';

import IForm, { useForm, useWatch } from 'rc-field-form';
import { createContext, lazy } from 'react';
import { FormInstance, FormProps } from './type';
import { useFormInstance } from './hooks';



export const FormProvider = createContext<FormInstance<never>>({});


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

  const current = (iform ?? form);

  return (
    <IForm ref={ref} form={current}>
      <FormProvider.Provider value={current}>
        {children}
      </FormProvider.Provider>
    </IForm>
  );
}


Form.Field = lazy(() => import('./field'));
Form.useForm = useForm;
Form.useWatch = useWatch;
Form.useFormInstance = useFormInstance;

