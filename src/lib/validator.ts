import { FormValidationError } from "@/domain/errors/form-validation-error";
import { ClientErrorMsg, ValidationScheme, Validator } from "@/domain/types";

export const invalidFieldMsg: ClientErrorMsg = (field: string) =>
  `${field} is invalid`;
export const emptyFieldMsg: ClientErrorMsg = (field: string) =>
  `${field} is empty`;
export const lessThan4CharsFieldMsg: ClientErrorMsg = (field: string) =>
  `${field} must have at least (4) characters`;

export const nullValueMsg: ClientErrorMsg = (field: string) => "";

export function validate(
  fieldName: string,
  value: string,
  validators: Validator[]
): Array<string> {
  const errMsgs = validators
    .map((validator) => validator(value)(fieldName))
    .filter((item) => item);

  return errMsgs;
}

export function validateScheme<T>(scheme: ValidationScheme): T {
  let errors: Array<string> = [];
  const rawobj: any = {};

  for (const key in scheme) {
    errors = errors.concat(
      validate(key, scheme[key].value, scheme[key].validators)
    );
    rawobj[key] = scheme[key].value;
  }

  if (errors.length) {
    throw new FormValidationError(errors);
  }

  return rawobj as T;
}

export const emailPatternValidator: Validator = (value) => {
  const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  if (!value || !emailRegex.test(value)) {
    return invalidFieldMsg;
  }

  return nullValueMsg;
};

export const min4CharsValidator: Validator = (value) => {
  if (!value || value.length < 4) {
    return lessThan4CharsFieldMsg;
  }
  return nullValueMsg;
};

export const nonEmptyValidator: Validator = (value) => {
  if (!value) {
    return lessThan4CharsFieldMsg;
  }
  return nullValueMsg;
};
