import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Profile from "@/pages/profile";
import { userDummy } from "../dummies";
import NavbarLayout from "@/layouts/navbarLayout";
import WelcomeProfilePage from "@/components/WelcomeProfilePage";
import ContentLayout from "@/layouts/contentLayout";

jest.mock("next/router", () => require("next-router-mock"));

describe("Profile page", () => {
  beforeEach(() => {
    render(
      <NavbarLayout>
        <>
          <WelcomeProfilePage />
          <ContentLayout>
            <Profile user={userDummy} />
          </ContentLayout>
        </>
      </NavbarLayout>
    );
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

  it("When the edit button is clicked should go to edit profile page", () => {
    const registerLink = screen.getByTestId("edit-link");
    expect(registerLink.getAttribute("href")).toBe("/profile/edit");
  });
});
