import { FormikValues } from 'formik';
import { get, isEmpty, keys, has } from 'lodash';

import { IValidations } from './validationTypes.d';

export const checkValueError = (validations: IValidations) => (values: FormikValues, props?: any) => {
  const error: { [key: string]: any } = {};
  let checkValidate = false;
  keys(validations).forEach((path: string) => {
    const pathValue = get(values, path);
    const isExistingKey = has(values, path);
    if (!isExistingKey) {
      // tslint:disable-next-line:no-console
      console && console.error(`The field ${path} does not existing on the form`);
    }
    for (let i = 0; i < validations[path].length; i += 1) {
      const pathItem = validations[path][i];
      checkValidate = pathItem.validator(pathValue, values, props);
      if (!checkValidate) {
        const { code } = pathItem;
        error[path] = code;
        return error;
      }
    }
  });

  return error;
};

export const validateRequired = (value: string | number) => {
  let error = true;

  // If the input field is empty, the value will be assigned to NaN. So, the type of the "NaN" is a number,
  // but it's not a number type when the field is empty. So we need to check it's actually a number type.
  if (typeof value === 'number' && !isNaN(value)) {
    return true;
  }

  if (isEmpty(value) && isEmpty(value && value.toString())) {
    error = false;
  }
  return error;
};
