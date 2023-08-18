import { FormValidationError } from "@/domain/errors/form-validation-error";
import { ClientErrorMsg, FileUploadeable, ValidationScheme, Validator } from "@/domain/types";
import Base64Util from "@/lib/base64";

export const invalidFieldMsg: ClientErrorMsg = (field: string) =>
  `${field} is invalid`;
export const emptyFieldMsg: ClientErrorMsg = (field: string) =>
  `${field} is empty`;
export const lessThan4CharsFieldMsg: ClientErrorMsg = (field: string) =>
  `${field} must have at least (4) characters`;

export const invalidImageFormatMsg: ClientErrorMsg = (field: string) =>
  `${field} must be a valid image format (png, jpeg, jpg, svg)`;

export const nullValueMsg: ClientErrorMsg = (field: string) => "";

export function validate(
  fieldName: string,
  value: string,
  validators: Validator[]
): void {
  const errMsgs = validators
    .map((validator) => validator(value)(fieldName))
    .filter((item) => item);

  if (errMsgs.length) {
    throw new FormValidationError(errMsgs);
  }
}

export function validateScheme<T>(scheme: ValidationScheme): T {
  let errors: Array<string> = [];
  const rawobj: any = {};

  for (const key in scheme) {
    try {
      validate(key, scheme[key].value, scheme[key].validators);
    } catch (error) {
      errors = errors.concat((error as FormValidationError).errorMsgs);
    }
    rawobj[key] = scheme[key].value;
  }

  if (errors.length) {
    throw new FormValidationError(errors);
  }

  return rawobj as T;
}

export const photoNameExtensionValidator: Validator = (value: FileUploadeable) => {
  const allowedExtensions = /(\.png|\.jpeg|\.jpg|\.svg)$/i;
  if (!value || !allowedExtensions.exec(value.name)) {
    return invalidImageFormatMsg;
  }

  return nullValueMsg;
};


export const phoneNumberValidator: Validator = (value) => {
  if (isNaN(Number(value))) {
    return invalidFieldMsg;
  }

  return nullValueMsg;
};

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

export const authBasicValidator: Validator = (value) => {
  const params = value ? value.split(" ") : [];
  if (
    params.length < 2 ||
    params[0] !== "Basic" ||
    Base64Util.decode(params[1]).split(":").length < 2
  ) {
    return invalidFieldMsg;
  }
  return nullValueMsg;
};

export const nonEmptyValidator: Validator = (value) => {
  if (!value) {
    return emptyFieldMsg;
  }
  return nullValueMsg;
};
