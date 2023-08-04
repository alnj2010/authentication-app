import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Profile from "@/pages/profile";
import { userDummy } from "../dummies";
import userEvent from "@testing-library/user-event";

import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));

describe("Profile page", () => {
  beforeEach(() => {
    render(<Profile user={userDummy} />, { wrapper: MemoryRouterProvider });
  });

  it("Should render properly", () => {
    screen.getByTestId("edit-button");
    screen.getByTestId("photo-label");
    screen.getByTestId("name-label");
    screen.getByTestId("bio-label");
    screen.getByTestId("phone-label");
    screen.getByTestId("email-label");
    screen.getByTestId("password-label");
  });

  it("Should show user info", () => {
    expect(screen.getByTestId("name-label").textContent).toBe(userDummy.name);
    expect(screen.getByTestId("bio-label").textContent).toBe(userDummy.bio);
    expect(screen.getByTestId("phone-label").textContent).toBe(userDummy.phone);
    expect(screen.getByTestId("email-label").textContent).toBe(userDummy.email);
    expect(screen.getByTestId("password-label").textContent).toBe(
      userDummy.password
    );
    expect(screen.getByTestId("photo-label").getAttribute("src")).toBe(
      userDummy.photo
    );
  });

  it("When the edit button is clicked should go to edit profile page", async () => {
    const editProfileLink = screen.getByTestId("edit-link");

    await userEvent.click(editProfileLink);
    expect(mockRouter.asPath).toEqual("/profile/edit");
  });
});
