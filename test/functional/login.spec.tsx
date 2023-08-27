import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Login from "@/pages";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { userAuthDummy } from "../dummies";
import { Api } from "@/lib/api";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";

import { submitAuthForm } from "../shared";
import { invalidFieldMsg, lessThan4CharsFieldMsg } from "@/lib/validator";
import HeaderUtil from "@/lib/header";
import { SERVICE_ERROR_INVALID_CREDENTIALS } from "@/domain/constants";
import { ApiError } from "@/domain/errors/api-error";

jest.mock("@/lib/api");

jest.mock("next/router", () => require("next-router-mock"));

describe("Login page", () => {
  beforeEach(() => {
    render(<Login />, { wrapper: MemoryRouterProvider });
  });

  it("Should render properly", () => {
    screen.getByTestId("textfield-user-email");
    screen.getByTestId("textfield-user-password");
    screen.getByTestId("login-button");
    screen.getByTestId("google-button");
    screen.getByTestId("facebook-button");
    screen.getByTestId("twitter-button");
    screen.getByTestId("github-button");
    screen.getByTestId("register-link");
    expect(screen.queryByTestId("error-messages")).toBeNull();
  });

  it("When register Link is clicked should go to register page", async () => {
    const registerLink = screen.getByTestId("register-link");
    await userEvent.click(registerLink);
    expect(mockRouter.asPath).toEqual("/register");
  });

  it("When there is not info in the text fields the login button is disabled", async () => {
    const loginButton = screen.getByTestId("login-button");
    expect(loginButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("When login textfields are filled the login button should be active", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");
    await userEvent.type(textFieldUserEmail, userAuthDummy.email);
    await userEvent.type(textFieldUserPassword, userAuthDummy.password);

    const loginButton = screen.getByTestId("login-button");

    expect(loginButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When login form is submited but there is a invalid email should show a messages error", async () => {
    await submitAuthForm("login", {
      password: userAuthDummy.password,
      email: "invalidemail",
    });

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      invalidFieldMsg("email")
    );
  });

  it("When login form is submited but there is a with less than (4) characters should show a messages error", async () => {
    await submitAuthForm("login", {
      password: "p",
      email: userAuthDummy.email,
    });

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      lessThan4CharsFieldMsg("password")
    );
  });

  it("When login form is submited with correct data but invalid credentials should show error messages", async () => {
    jest
      .spyOn(Api, "post")
      .mockRejectedValue(new ApiError(SERVICE_ERROR_INVALID_CREDENTIALS));
    await submitAuthForm("login", userAuthDummy);

    jest.spyOn(HeaderUtil, "serializeAuthorizationHeader");
    
    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      SERVICE_ERROR_INVALID_CREDENTIALS
    );
    expect(
      (Api.post as jest.Mock).mock.lastCall[2].headers.authorization
    ).toContain("Basic");
  });

  it("When login form is submited with valid data should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue(null);

    await submitAuthForm("login", userAuthDummy);

    expect(
      (Api.post as jest.Mock).mock.lastCall[2].headers.authorization
    ).toContain("Basic");
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When login form is submited with valid data but a error service occurred should go to error page", async () => {
    jest
      .spyOn(Api, "post")
      .mockRejectedValue(new InternalONotFoundApiError("some error"));

    await submitAuthForm("login", userAuthDummy);

    expect(
      (Api.post as jest.Mock).mock.lastCall[2].headers.authorization
    ).toContain("Basic");
    expect(mockRouter.asPath).toEqual("/500");
  });
});
