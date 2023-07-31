import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import AuthLayout from "@/layouts/authLayout";

jest.mock("next/router", () => require("next-router-mock"));

describe("Auth layout", () => {
  beforeEach(() => {
    render(
      <AuthLayout>
        <>authContent</>
      </AuthLayout>
    );
  });

  it("Should render properly", () => {
    const childrenContainer = screen.getByTestId("auth-children");
    screen.getByTestId("footer");
    expect(childrenContainer.textContent).toBe("authContent");
  });
});
