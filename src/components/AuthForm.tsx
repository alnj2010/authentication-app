import IconInput from "@/components/IconInput";
import Button from "@/components/Button";
import { FormEvent, useState } from "react";
import Typography from "@/components/Typography";
import { AuthInfo, AuthService } from "@/domain/types";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";

import { useRouter } from "next/router";
import {
  emailPatternValidator,
  min4CharsValidator,
  nonEmptyValidator,
  validateScheme,
} from "@/lib/validator";
import { FormValidationError } from "@/domain/errors/form-validation-error";
import { ApiError } from "@/domain/errors/api-error";
import { useTextField } from "@/hooks/useTextFile";

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

  const [email, emailHandler] = useTextField("");
  const [password, passwordHandler] = useTextField("");

  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

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
      if (error instanceof ApiError) setErrorMessages([error.message]);
      else if (error instanceof FormValidationError)
        setErrorMessages(error.errorMsgs);
      else if (error instanceof InternalONotFoundApiError) router.push("/500");
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
