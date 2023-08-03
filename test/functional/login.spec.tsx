import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Login from "../../src/pages";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { userDummy } from "../dummies";
import { Api } from "@/lib/api";
import { CustomApiError } from "@/domain/errors/custom-api-error";

jest.mock("../../src/lib/api");

jest.mock("next/router", () => require("next-router-mock"));

describe("Login page", () => {
  beforeEach(() => {
    render(<Login />, { wrapper: MemoryRouterProvider });
  });

  it("Should render properly", () => {
    screen.getByTestId("textfield-user-email");
    screen.getByTestId("textfield-user-password");
    screen.getByTestId("login-button");
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

  it("When textfields are filled the login button should be active", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");
    await userEvent.type(textFieldUserEmail, userDummy.email);
    await userEvent.type(textFieldUserPassword, userDummy.password);

    const loginButton = screen.getByTestId("login-button");

    expect(loginButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When login button is clicked but there is a invalid email should show a messages error", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, "invalid email");
    await userEvent.type(textFieldUserPassword, userDummy.password);

    const loginButton = screen.getByTestId("login-button");
    await userEvent.click(loginButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain("Email is invalid");
  });

  it("When login button is clicked with correct data but invalid credentials should show error messages", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: false,
      data: { code: 401, error: "Invalid Credentials" },
    });
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, userDummy.email);
    await userEvent.type(textFieldUserPassword, userDummy.password);

    const loginButton = screen.getByTestId("login-button");
    await userEvent.click(loginButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      "Invalid Credentials"
    );
  });

  it("When login button is clicked with valid data and credentials should not show error messages", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });

    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, userDummy.email);
    await userEvent.type(textFieldUserPassword, userDummy.password);
    const loginButton = screen.getByTestId("login-button");
    await userEvent.click(loginButton);
    expect(screen.queryByTestId("error-messages")).toBeNull();
  });

  it("When login button is clicked with valid data but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new CustomApiError("some error"));

    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, userDummy.email);
    await userEvent.type(textFieldUserPassword, userDummy.password);
    const loginButton = screen.getByTestId("login-button");
    await userEvent.click(loginButton);

    expect(mockRouter.asPath).toEqual("/500");
  });
});
