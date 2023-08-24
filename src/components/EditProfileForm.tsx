import { UserEntity, UserSubmit } from "@/domain/types";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import TextAreaField from "@/components/TextAreaField";
import FileField from "@/components/FileField";
import Typography from "@/components/Typography";
import {
  min4CharsValidator,
  nonEmptyValidator,
  phoneNumberValidator,
  photoNameExtensionValidator,
  photoSizeValidator,
} from "@/lib/validator";

import { useForm } from "@/hooks/useForm";

type Props = {
  initial: UserEntity;
  redirectTo: string;
  updateProfileService: (user: UserSubmit) => Promise<void>;
};

export default function EditProfileForm({
  initial,
  updateProfileService,
  redirectTo,
}: Props) {
  const [
    fields,
    handleFields,
    handleSubmit,
    errorMessages,
    isSubmitButtonDisabled,
  ] = useForm<UserSubmit>(
    updateProfileService,
    {
      photo: {
        value: initial.photo,
        validators: [photoNameExtensionValidator, photoSizeValidator],
      },
      name: {
        value: initial.name,
        validators: [],
      },
      bio: {
        value: initial.bio,
        validators: [],
      },
      phone: {
        value: initial.phone,
        validators: [phoneNumberValidator],
      },
      password: {
        value: initial.password,
        validators: [nonEmptyValidator, min4CharsValidator],
      },
    },
    redirectTo
  );

  const areThereErrors = !!errorMessages.length;

  return (
    <form className="pb-11 max-w-md" onSubmit={handleSubmit}>
      <div className="pb-8">
        <FileField
          onChange={handleFields}
          name="photo"
          id="filefield-edit-user-photo"
          title="CHANGE PHOTO"
          value={fields.photo}
        />
      </div>

      <div className="pb-6">
        <TextField
          onChange={handleFields}
          name="name"
          id="textfield-edit-user-name"
          type="text"
          placeholder="Enter your name..."
          title="Name"
          value={fields.name}
        />
      </div>

      <div className="pb-6">
        <TextAreaField
          onChange={handleFields}
          name="bio"
          id="textfield-edit-user-bio"
          placeholder="Enter your bio..."
          title="Bio"
          value={fields.bio}
        />
      </div>

      <div className="pb-6">
        <TextField
          name="phone"
          onChange={handleFields}
          id="textfield-edit-user-phone"
          type="text"
          placeholder="Enter your phone..."
          title="Phone"
          value={fields.phone}
        />
      </div>

      <div className="pb-6">
        <TextField
          name="email"
          id="textfield-edit-user-email"
          type="text"
          placeholder="Enter your email..."
          readOnly
          title="Email"
          value={initial.email}
        />
      </div>

      <div className="pb-6">
        <TextField
          name="password"
          onChange={handleFields}
          id="textfield-edit-user-password"
          type="password"
          placeholder="Enter your password..."
          title="Password"
          value={fields.password}
        />
      </div>

      <div className="w-20">
        <Button id="save-button" disabled={isSubmitButtonDisabled}>
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
