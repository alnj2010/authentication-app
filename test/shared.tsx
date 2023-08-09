import { AuthInfo } from "@/domain/types";
import { screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

export async function submitAuthForm(
  typeAuth: "login" | "register",
  user?: AuthInfo
) {
  const textFieldUserEmail = screen.getByTestId("textfield-user-email");
  const textFieldUserPassword = screen.getByTestId("textfield-user-password");

  if (user) {
    await userEvent.type(textFieldUserEmail, user.email);
    await userEvent.type(textFieldUserPassword, user.password);
  }
  const loginButton = screen.getByTestId(`${typeAuth}-button`);
  await userEvent.click(loginButton);
}
