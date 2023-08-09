import { UserResponse, UserSubmit, ValidationScheme } from "@/domain/types";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import TextAreaField from "@/components/TextAreaField";
import FileField from "@/components/FileField";
import { ChangeEvent, FormEvent, useState } from "react";
import Typography from "@/components/Typography";
import {
  emailPatternValidator,
  min4CharsValidator,
  nonEmptyValidator,
  phoneNumberValidator,
  photoFormatValidator,
  validateScheme,
} from "@/lib/validator";
import router from "next/router";
import { FormValidationError } from "@/domain/errors/form-validation-error";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";
import { useTextField } from "@/hooks/useTextFile";

type Props = {
  initial: UserResponse;
  updateProfileService: (user: UserSubmit) => Promise<void>;
};

export default function EditProfileForm({
  initial,
  updateProfileService,
}: Props) {
  const [name, nameHandler] = useTextField(initial.name);
  const [bio, bioHandler] = useTextField(initial.bio);
  const [phone, phoneHandler] = useTextField(initial.phone);
  const [email, emailHandler] = useTextField(initial.email);
  const [password, passwordHandler] = useTextField(initial.password);

  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

  const [photo, setPhoto] = useState<{ file: File | null; url: string }>({
    file: null,
    url: initial.photo,
  });
  const photoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length) {
      setPhoto({ file: files[0], url: URL.createObjectURL(files[0]) });
    }
  };

  const isDisabled = !(
    photo.url !== initial.photo ||
    name !== initial.name ||
    phone !== initial.phone ||
    bio !== initial.bio ||
    email !== initial.email ||
    password !== initial.password
  );
  const areThereErrors = !!errorMessages.length;

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userSubmitScheme: ValidationScheme = {
      photo: {
        value: photo.file,
        validators: photo.file ? [photoFormatValidator] : [],
      },
      name: {
        value: name,
        validators: [],
      },
      bio: {
        value: name,
        validators: [],
      },
      phone: {
        value: phone,
        validators: [phoneNumberValidator],
      },
      email: {
        value: email,
        validators: [nonEmptyValidator, emailPatternValidator],
      },
      password: {
        value: password,
        validators: [nonEmptyValidator, min4CharsValidator],
      },
    };

    try {
      const userSubmit = validateScheme<UserSubmit>(userSubmitScheme);
      await updateProfileService(userSubmit);
      router.push("/profile");
    } catch (error) {
      if (error instanceof FormValidationError)
        setErrorMessages(error.errorMsgs);
      else if (error instanceof InternalONotFoundApiError) router.push("/500");
    }
  };

  return (
    <form className="pb-11 max-w-md" onSubmit={handlerSubmit}>
      <div className="pb-8">
        <FileField
          onChange={photoHandler}
          id="filefield-edit-user-photo"
          title="CHANGE PHOTO"
          value={photo.url}
        />
      </div>

      <div className="pb-6">
        <TextField
          onChange={nameHandler}
          id="textfield-edit-user-name"
          type="text"
          placeholder="Enter your name..."
          title="Name"
          value={name}
        />
      </div>

      <div className="pb-6">
        <TextAreaField
          onChange={bioHandler}
          id="textfield-edit-user-bio"
          placeholder="Enter your bio..."
          title="Bio"
          value={bio}
        />
      </div>

      <div className="pb-6">
        <TextField
          onChange={phoneHandler}
          id="textfield-edit-user-phone"
          type="text"
          placeholder="Enter your phone..."
          title="Phone"
          value={phone}
        />
      </div>

      <div className="pb-6">
        <TextField
          onChange={emailHandler}
          id="textfield-edit-user-email"
          type="text"
          placeholder="Enter your email..."
          title="Email"
          value={email}
        />
      </div>

      <div className="pb-6">
        <TextField
          onChange={passwordHandler}
          id="textfield-edit-user-password"
          type="password"
          placeholder="Enter your password..."
          title="Password"
          value={password}
        />
      </div>

      <div className="w-20">
        <Button id="save-button" disabled={isDisabled}>
          Save
        </Button>
      </div>
      {areThereErrors && (
        <div data-testid="error-messages" className="pt-3">
          {errorMessages.map((msg) => (
            <Typography key={msg} variant="subtitle4" color="text-red">
              **{msg}
            </Typography>
          ))}
        </div>
      )}
    </form>
  );
}
