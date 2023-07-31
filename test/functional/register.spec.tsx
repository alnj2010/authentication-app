import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Register from "@/pages/register";

jest.mock("next/router", () => require("next-router-mock"));

describe("Register page", () => {
  beforeEach(() => {
    render(<Register />);
  });

  it("Should render properly", () => {
    screen.getByTestId("textfield-user-email");
    screen.getByTestId("textfield-user-password");
    screen.getByTestId("register-button");
    screen.getByTestId("login-link");
  });

  it("When register Link is clicked should go to register page", async () => {
    const registerLink = screen.getByTestId("login-link");
    expect(registerLink.getAttribute("href")).toBe("/");
  });
});
