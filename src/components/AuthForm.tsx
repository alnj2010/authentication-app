import IconInput from "@/components/IconInput";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { AuthInfo, AuthService } from "@/domain/types";

import {
  emailPatternValidator,
  min4CharsValidator,
  nonEmptyValidator,
} from "@/lib/validator";

import { useForm } from "@/hooks/useForm";

type Props = {
  authService: AuthService;
  buttonTitle: string;
  buttonId: string;
  redirectTo: string;
};

export default function AuthForm({
  authService,
  buttonTitle,
  buttonId,
  redirectTo,
}: Props) {
  const [
    fields,
    handleFields,
    handleSubmit,
    errorMessages,
    isSubmitButtonDisabled,
  ] = useForm<AuthInfo>(
    authService,
    {
      email: {
        value: "",
        validators: [nonEmptyValidator, emailPatternValidator],
      },
      password: {
        value: "",
        validators: [nonEmptyValidator, min4CharsValidator],
      },
    },
    redirectTo
  );

  const areThereErrors = !!errorMessages.length;
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3.5">
        <IconInput
          onChange={handleFields}
          name="email"
          value={fields.email}
          id="textfield-user-email"
          iconSrc="/mail.svg"
          iconAlt="mail icon"
          type="text"
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <IconInput
          name="password"
          onChange={handleFields}
          value={fields.password}
          id="textfield-user-password"
          iconSrc="/lock.svg"
          iconAlt="lock icon"
          type="password"
          placeholder="Password"
        />
      </div>
      <Button
        data-testid={buttonId}
        id={buttonId}
        disabled={isSubmitButtonDisabled}
      >
        {buttonTitle}
      </Button>
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
