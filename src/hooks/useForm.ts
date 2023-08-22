import { ChangeEvent, FormEvent, useState } from "react";
import { ValidationScheme } from "@/domain/types";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";
import { useRouter } from "next/router";
import { nonEmptyValidator, validateScheme } from "@/lib/validator";
import { FormValidationError } from "@/domain/errors/form-validation-error";
import { ApiError } from "@/domain/errors/api-error";

type HandleField = (
  e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => void;

type HandleSubmit = (e: FormEvent<HTMLFormElement>) => void;

function parseSchemmeToFields<T>(scheme: ValidationScheme): T {
  const fields: { [key: string]: any } = {};
  for (const key in scheme) {
    fields[key as keyof { [key: string]: any }] = scheme[key].value;
  }
  return fields as T;
}

function calculateStateSubmitButton<T>(
  initial: T,
  fields: T,
  scheme: ValidationScheme
): boolean {
  let areThereRequiredFieldsEmpty: boolean = false;
  let areThereSomeFieldChanged: boolean = false;
  for (const key in initial) {
    const isRequired = scheme[key].validators.includes(nonEmptyValidator);
    areThereRequiredFieldsEmpty =
      areThereRequiredFieldsEmpty || (isRequired && !fields[key]);

    areThereSomeFieldChanged =
      areThereSomeFieldChanged || fields[key] !== initial[key];
  }
  return areThereRequiredFieldsEmpty || !areThereSomeFieldChanged;
}

export function useForm<T>(
  service: (value: any) => Promise<void>,
  formScheme: ValidationScheme
): [T, HandleField, HandleSubmit, Array<string>, boolean] {
  const initial = parseSchemmeToFields<T>(formScheme);

  const [fields, setField] = useState<T>(initial);

  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const key in formScheme) {
      formScheme[key].value = fields[key as keyof T];
    }

    try {
      const submitValue = validateScheme<T>(formScheme);

      await service(submitValue);
      router.push("/profile");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessages([error.message]);
      } else if (error instanceof FormValidationError) {
        setErrorMessages(error.errorMsgs);
      } else if (error instanceof InternalONotFoundApiError) {
        router.push("/500");
      }
    }
  };

  const handleFields = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.type === "file") {
      const files: FileList | null = (e as ChangeEvent<HTMLInputElement>).target
        .files;
      if (files && files.length) {
        setField({ ...fields, [e.target.name]: files[0] });
      }
    } else setField({ ...fields, [e.target.name]: e.target.value });
  };

  let isSubmitButtonDisabled = calculateStateSubmitButton(
    initial,
    fields,
    formScheme
  );

  return [
    fields,
    handleFields,
    handleSubmit,
    errorMessages,
    isSubmitButtonDisabled,
  ];
}
