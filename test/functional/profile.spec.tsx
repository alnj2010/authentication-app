import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Profile from "@/pages/profile";

jest.mock("next/router", () => require("next-router-mock"));

describe("Profile page", () => {
  beforeEach(() => {
    render(<Profile />);
  });

  it("Should render properly", () => {
    screen.getByTestId("edit-button");
    screen.getByTestId("photo-label");
    screen.getByTestId("name-label");
    screen.getByTestId("bio-label");
    screen.getByTestId("phone-label");
    screen.getByTestId("email-label");
    screen.getByTestId("password-label");
    screen.getByTestId("logout-button");
  });
});
