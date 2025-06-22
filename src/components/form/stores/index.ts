import { FormInstance, NamePath } from '../type';

export default class FormStore<T> {

  store: Record<string, unknown>;

  constructor() {
    this.store = {};

  }
  getFieldValue = (name: NamePath<T>) => {

  };
}
