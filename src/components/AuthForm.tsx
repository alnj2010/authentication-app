import IconInput from "@/components/IconInput";
import Button from "@/components/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import Typography from "@/components/Typography";
import { AuthInfo, AuthService } from "@/domain/types";
import { CustomApiError } from "@/domain/errors/custom-api-error";

import { useRouter } from "next/router";
import {
  emailPatternValidator,
  min4CharsValidator,
  nonEmptyValidator,
  validateScheme,
} from "@/lib/validator";
import { FormValidationError } from "@/domain/errors/form-validation-error";
import { AuthError } from "@/domain/errors/auth-error";

type Props = {
  authService: AuthService;
  buttonTitle: string;
  buttonId: string;
};

export default function AuthForm({
  authService,
  buttonTitle,
  buttonId,
}: Props) {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
  const [password, setPassword] = useState<string>("");

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authInfoScheme = {
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
      const authInfo = validateScheme<AuthInfo>(authInfoScheme);

      await authService(authInfo);
      router.push("/profile");
    } catch (error) {
      if (error instanceof AuthError) setErrorMessages([error.message]);
      else if (error instanceof FormValidationError)
        setErrorMessages(error.errorMsgs);
      else if (error instanceof CustomApiError) router.push("/500");
    }
  };

  const isDisabled = email && password ? false : true;
  const areThereErrors = !!errorMessages.length;

  return (
    <form onSubmit={handlerSubmit}>
      <div className="mb-3.5">
        <IconInput
          onChange={emailHandler}
          value={email}
          id="textfield-user-email"
          iconSrc="/mail.svg"
          iconAlt="mail icon"
          type="text"
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <IconInput
          onChange={passwordHandler}
          value={password}
          id="textfield-user-password"
          iconSrc="/lock.svg"
          iconAlt="lock icon"
          type="password"
          placeholder="Password"
        />
      </div>
      <Button data-testid={buttonId} id={buttonId} disabled={isDisabled}>
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
