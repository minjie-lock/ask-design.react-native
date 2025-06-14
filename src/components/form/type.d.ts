
export type FormProps<T> = {
  /**
   * 是否禁用
  */
  disabled?: boolean;
  /**
   * 底部
   */
  footer?: React.ReactNode;
  /**
   * 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
  */
  form?: FormInstance;
  /**
   * 是否展示错误反馈
   */
  hasFeedback?: boolean;
  /**
   * 表单默认值，只有初始化以及重置时生效
   */
  initialValues?: T;
  /**
   * 布局模式
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 支持默认和卡片两种模式
   */
  mode?: 'default' | 'card';
  /**
   * 字段更新时触发
   */
  onFieldsChange?: (changedFields, allFields) => void;
  /**
   * 提交表单且数据验证成功后触发
   */
  onFinish?: (values: T) => void;
  /**
   * 提交表单且数据验证失败后触发
   */
  onFinishFailed?: (errorInfo: any) => void;
  /**
   * 字段值更新时触发
   */
  onValuesChange?: (changedValues: any, allValues: any) => void;
  /**
   * 当字段被删除时保留字段值
   */
  preserve?: boolean;
  children?: React.ReactNode;
}

type NamePath<T> = T;


export type FormInstance<T extends Record<string, unknown>> = {
  /**
   * 获取对应字段名的错误信息
   * @param name
   * @returns
   */
  getFieldError?: (name: NamePath) => keyof T[];
  /**
   * 获取对应字段名的值
   * @param name
   * @returns
   */
  getFieldValue?: (name: NamePath) =>  keyof T[];
  /**
   * 获取一组字段名对应的错误信息，返回为数组形式
   * @param name 
   * @param value 
   */
  getFieldsError?: (name: NamePath) => string[];
  /**
   * @description 获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值，当调用 getFieldsValue(true) 时返回所有值
   */
  getFieldsValue?: (name: NamePath) => any;
  /**
   * @description 检查对应字段是否被用户操作过
   * @returns {boolean}
   */
  isFieldTouched?: (name: NamePath) => boolean;
  /**
   * @description 检查一组字段是否被用户操作过，allTouched 为 true 时检查是否所有字段都被操作过
   * @returns {boolean}
   */
  isFieldsTouched?: (name: NamePath) => boolean;
  /**
   * @description 重置一组字段状态
   * @returns {boolean}
   */
  resetFields?: (name: NamePath) => void;
  /**
   * 
   */
  setFields?: (fields: FieldData[]) => void;
  /**
   * @description 设置字段值
   * @returns {boolean}
   */
  setFieldValue?: (name: NamePath, value: any) => void;
  /**
   * @description 设置表单的值（该值将直接传入 form store 中。如果你不希望传入对象被修改，请克隆后传入）
   * @param value 
   * @returns 
   */
  setFieldsValue?: (value) => void;
  /**
   * @description 获取字段值
   * @param name 
   * @returns 
   */
  validateFields?: (name?: NamePath) => Promise<any>;
}


type d= {
  name: '',
  rest: ''
} ;


