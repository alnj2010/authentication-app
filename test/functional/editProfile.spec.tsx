import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import EditProfile from "@/pages/profile/edit";
import { userDummy } from "../dummies";
import NavbarLayout from "@/layouts/navbarLayout";
import BackLink from "@/components/BackLink";
import ContentLayout from "@/layouts/contentLayout";

jest.mock("next/router", () => require("next-router-mock"));

describe("Edit Profile page", () => {
  beforeEach(() => {
    render(
      <NavbarLayout user={userDummy}>
        <>
          <BackLink />
          <ContentLayout>
            <EditProfile user={userDummy} />
          </ContentLayout>
        </>
      </NavbarLayout>
    );
  });

  it("Should render properly", () => {
    screen.getByTestId("filefield-edit-user-photo");
    screen.getByTestId("textfield-edit-user-name");
    screen.getByTestId("textfield-edit-user-bio");
    screen.getByTestId("textfield-edit-user-phone");
    screen.getByTestId("textfield-edit-user-email");
    screen.getByTestId("textfield-edit-user-password");

    screen.getByTestId("save-button");
    screen.getByTestId("back-link");
  });

  it("When the back link is clicked should go to profile page", () => {
    const registerLink = screen.getByTestId("back-link");
    expect(registerLink.getAttribute("href")).toBe("/profile");
  });
});
