import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NavbarLayout from "@/layouts/navbarLayout";
import { userDummy } from "../dummies";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));

describe("Navbar layout", () => {
  beforeEach(() => {
    render(
      <NavbarLayout user={userDummy}>
        <>Content</>
      </NavbarLayout>,
      { wrapper: MemoryRouterProvider }
    );
  });

  it("Should render properly", () => {
    screen.getByTestId("nav-children");
    screen.getByTestId("menu-user-photo");
    screen.getByTestId("menu-user-name");
    screen.getByTestId("menu-button");

    const childrenContainer = screen.getByTestId("nav-children");
    expect(childrenContainer.textContent).toBe("Content");
  });

  it("Should show user name", () => {
    expect(screen.getByTestId("menu-user-name").textContent).toBe(
      userDummy.name
    );
  });

  it("Should show user photo", () => {
    expect(screen.getByTestId("menu-user-photo").getAttribute("src")).toBe(
      userDummy.photo
    );
  });

  it("When navbar menu button is clicked should show items menu", async () => {
    const menuButton = screen.getByTestId("menu-button");
    await userEvent.click(menuButton);

    const menuItems = screen.getByTestId("menu-items");
    expect(menuItems.childElementCount).toBe(3);
    screen.getByTestId("item-profile-link");
    screen.getByTestId("item-logout-link");
  });

  it("When profile item link is clicked should go to profile", async () => {
    const menuButton = screen.getByTestId("menu-button");
    await userEvent.click(menuButton);
    const itemProfileLink = screen.getByTestId("item-profile-link");
    await userEvent.click(itemProfileLink);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When logout item link is clicked should go to login page", async () => {
    const menuButton = screen.getByTestId("menu-button");
    await userEvent.click(menuButton);
    const itemLogoutLink = screen.getByTestId("item-logout-link");
    await userEvent.click(itemLogoutLink);
    expect(mockRouter.asPath).toEqual("/");
  });
});
