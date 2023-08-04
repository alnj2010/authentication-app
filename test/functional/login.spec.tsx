import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Login from "@/pages";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { userDummy } from "../dummies";
import { Api } from "@/lib/api";
import { CustomApiError } from "@/domain/errors/custom-api-error";
import {
  AUTH_CLIEN_ERROR_INVALID_EMAIL,
  AUTH_CLIEN_ERROR_PASSWORD_INVALID_LENGHT,
  LOGIN_SERVICE_ERROR_INVALID_CREDENTIALS,
} from "@/domain/constants";
import { submitForm } from "../shared";

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
    await userEvent.type(textFieldUserEmail, userDummy.email);
    await userEvent.type(textFieldUserPassword, userDummy.password);

    const loginButton = screen.getByTestId("login-button");

    expect(loginButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When login form is submited but there is a invalid email should show a messages error", async () => {
    await submitForm("login", {
      password: userDummy.password,
      email: "invalidemail",
    });

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      AUTH_CLIEN_ERROR_INVALID_EMAIL
    );
  });

  it("When login form is submited but there is a with less than (4) characters should show a messages error", async () => {
    await submitForm("login", { password: "p", email: userDummy.email });

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      AUTH_CLIEN_ERROR_PASSWORD_INVALID_LENGHT
    );
  });

  it("When login form is submited with correct data but invalid credentials should show error messages", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: false,
      data: { code: 401, error: LOGIN_SERVICE_ERROR_INVALID_CREDENTIALS },
    });
    await submitForm("login", userDummy);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      LOGIN_SERVICE_ERROR_INVALID_CREDENTIALS
    );
  });

  it("When login form is submited with valid data should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });

    await submitForm("login", userDummy);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When login form is submited with valid data but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));

    await submitForm("login", userDummy);

    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When login google button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));
    const googleButton = screen.getByTestId("google-button");
    await userEvent.click(googleButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When login google button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const googleButton = screen.getByTestId("google-button");
    await userEvent.click(googleButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When login facebook button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));
    const facebookButton = screen.getByTestId("facebook-button");
    await userEvent.click(facebookButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When login facebook button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const facebookButton = screen.getByTestId("facebook-button");
    await userEvent.click(facebookButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When login twitter button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));
    const twitterButton = screen.getByTestId("twitter-button");
    await userEvent.click(twitterButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When login twitter button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const twitterButton = screen.getByTestId("twitter-button");
    await userEvent.click(twitterButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When login github button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));
    const githubButton = screen.getByTestId("github-button");
    await userEvent.click(githubButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When github button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const githubButton = screen.getByTestId("github-button");
    await userEvent.click(githubButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });
});
