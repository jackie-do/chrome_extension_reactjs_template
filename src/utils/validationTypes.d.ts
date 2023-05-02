export type validationFieldProps = {
  validator: (...params: any) => boolean;
  code: string;
  codeOptions?: {
    [key: string]: any;
  };
};

export interface IValidations {
  [key: string]: validationFieldProps[];
}
