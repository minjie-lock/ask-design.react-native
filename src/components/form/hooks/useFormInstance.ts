import { FormInstance } from 'rc-field-form';
import { useContext } from 'react';
import { FormProvider } from '..';

/**
 * @function useFormInstance
 * @author Lock
 * @description 取得上下文 Form 实例
 * @returns {FormInstance}
 */
export default function useFormInstance<T>(): FormInstance<T> {

  const form = useContext(FormProvider);

  return form;
}
