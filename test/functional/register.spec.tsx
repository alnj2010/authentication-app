import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "@/pages/register";
import userEvent from "@testing-library/user-event";

import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { userDummy } from "../dummies";
import { submitForm } from "../shared";
import {
  AUTH_CLIEN_ERROR_INVALID_EMAIL,
  AUTH_CLIEN_ERROR_PASSWORD_INVALID_LENGHT,
} from "@/domain/constants";
import { Api } from "@/lib/api";
import { CustomApiError } from "@/domain/errors/custom-api-error";

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
    await userEvent.type(textFieldUserEmail, userDummy.email);
    await userEvent.type(textFieldUserPassword, userDummy.password);

    const registerButton = screen.getByTestId("register-button");

    expect(registerButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When register form is submited but there is a invalid email should show a messages error", async () => {
    await submitForm(
      "register",
      { password: userDummy.password, email: "invalidemail" },
    );

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      AUTH_CLIEN_ERROR_INVALID_EMAIL
    );
  });

  it("When register form is submited but there is a with less than (4) characters should show a messages error", async () => {
    await submitForm("register",{ password: "p", email: userDummy.email });

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      AUTH_CLIEN_ERROR_PASSWORD_INVALID_LENGHT
    );
  });

  it("When register form is submited with valid data should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });

    await submitForm("register",userDummy );
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When register form is submited with valid data but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));

    await submitForm("register", userDummy);

    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When register google button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));
    const googleButton = screen.getByTestId("google-button");
    await userEvent.click(googleButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When register google button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const googleButton = screen.getByTestId("google-button");
    await userEvent.click(googleButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When register facebook button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));
    const facebookButton = screen.getByTestId("facebook-button");
    await userEvent.click(facebookButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When register facebook button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const facebookButton = screen.getByTestId("facebook-button");
    await userEvent.click(facebookButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When register twitter button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));
    const twitterButton = screen.getByTestId("twitter-button");
    await userEvent.click(twitterButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When register twitter button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const twitterButton = screen.getByTestId("twitter-button");
    await userEvent.click(twitterButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When register github button is clicked but a error service occurred should go to error page", async () => {
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
