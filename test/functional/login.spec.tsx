import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Login from "../../src/pages";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

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
  });

  it("When register Link is clicked should go to register page", async () => {
    const registerLink = screen.getByTestId("register-link");
    await userEvent.click(registerLink);
    expect(mockRouter.asPath).toEqual("/register");
  });
});
