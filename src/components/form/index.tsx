// import { createContext } from 'react';
// import type { FormProps } from './type';
import IForm, { FormProps } from 'rc-field-form';

// const FormContext = createContext();

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
    ...rest
  } = props;

  const [form] = IForm.useForm<T>();

  return (
    <IForm {...rest} form={form}>
      {children}
    </IForm>
  );
}

Form.Field = IForm.Field;
