import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import AuthLayout from "@/layouts/authLayout";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));

describe("Auth layout", () => {
  beforeEach(() => {
    render(
      <AuthLayout
        authService={(user) => user}
        id="register"
        sectionTitle="sectionTitle"
        submitButtonText="submitButtonText"
        backPage="login"
        backText="backText"
        backLink="/"
      >
        <>authContent</>
      </AuthLayout>,
      { wrapper: MemoryRouterProvider }
    );
  });

  it("Should render properly", () => {
    const childrenContainer = screen.getByTestId("auth-children");
    screen.getByTestId("footer");
    expect(childrenContainer.textContent).toBe("authContent");
  });
});
