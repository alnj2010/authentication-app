import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "@/pages/register";
import userEvent from "@testing-library/user-event";

import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { userAuthDummy } from "../dummies";
import { submitAuthForm } from "../shared";

import { Api } from "@/lib/api";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";
import { invalidFieldMsg, lessThan4CharsFieldMsg } from "@/lib/validator";

jest.mock("next/router", () => require("next-router-mock"));

describe("Register page", () => {
  beforeEach(() => {
    render(<Register />, { wrapper: MemoryRouterProvider });
  });

  it("Should render properly", () => {
    screen.getByTestId("textfield-user-email");
    screen.getByTestId("textfield-user-password");
    screen.getByTestId("register-button");
    screen.getByTestId("google-button");
    screen.getByTestId("facebook-button");
    screen.getByTestId("twitter-button");
    screen.getByTestId("github-button");
    screen.getByTestId("login-link");
    expect(screen.queryByTestId("error-messages")).toBeNull();
  });

  it("When Login Link is clicked should go to login page", async () => {
    const loginLink = screen.getByTestId("login-link");
    await userEvent.click(loginLink);
    expect(mockRouter.asPath).toEqual("/");
  });

  it("When there is not info in the text fields the register button is disabled", async () => {
    const registerButton = screen.getByTestId("register-button");
    expect(registerButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("When register textfields are filled the register button should be active", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");
    await userEvent.type(textFieldUserEmail, userAuthDummy.email);
    await userEvent.type(textFieldUserPassword, userAuthDummy.password);

    const registerButton = screen.getByTestId("register-button");

    expect(registerButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When register form is submited but there is a invalid email should show a messages error", async () => {
    await submitAuthForm("register", {
      password: userAuthDummy.password,
      email: "invalidemail",
    });

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      invalidFieldMsg("email")
    );
  });

  it("When register form is submited but there is a with less than (4) characters should show a messages error", async () => {
    await submitAuthForm("register", { password: "p", email: userAuthDummy.email });

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      lessThan4CharsFieldMsg("password")
    );
  });

  it("When register form is submited with valid data should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });

    await submitAuthForm("register", userAuthDummy);

    expect((Api.post as jest.Mock).mock.lastCall[1]).toEqual(userAuthDummy);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When register form is submited with valid data but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new InternalONotFoundApiError("some error"));

    await submitAuthForm("register", userAuthDummy);

    expect((Api.post as jest.Mock).mock.lastCall[1]).toEqual(userAuthDummy);
    expect(mockRouter.asPath).toEqual("/500");
  });
});
