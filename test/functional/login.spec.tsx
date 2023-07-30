import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Login from "../../src/pages";

jest.mock("next/router", () => require("next-router-mock"));

describe("Login page", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("Should render properly", () => {
    screen.getByTestId("textfield-user-email");
    screen.getByTestId("textfield-user-password");
    screen.getByTestId("login-button");
    screen.getByTestId("register-link");
  });

  it("When register Link is clicked should go to register page", async () => {
    const registerLink = screen.getByTestId("register-link");
    expect(registerLink.getAttribute("href")).toBe("/register");
  });
});
