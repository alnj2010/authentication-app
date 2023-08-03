import IconInput from "@/components/IconInput";
import Button from "@/components/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import Typography from "@/components/Typography";
import { regularLogin } from "@/services/login";
import { AuthInfo } from "@/domain/types";
import { LoginError } from "@/domain/errors/login-error";
import { CustomApiError } from "@/domain/errors/custom-api-error";

import { useRouter } from "next/router";

export default function AuthForm() {
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
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const errors: Array<string> = [];

    if (!email || !emailRegex.test(email)) {
      errors.push("Email is invalid");
    }

    if (!password) {
      errors.push("Password is Empty");
    }

    if (errors.length === 0) {
      try {
        const authInfo: AuthInfo = {
          email,
          password,
        };
        await regularLogin(authInfo);
      } catch (error) {
        if (error instanceof LoginError) errors.push(error.message);
        else if (error instanceof CustomApiError) router.push("/500");
      }
    }
    setErrorMessages(errors);
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
      <Button id="login-button" disabled={isDisabled}>
        Login
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
