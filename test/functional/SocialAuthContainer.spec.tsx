import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

import "@testing-library/jest-dom";
import { Api } from "@/lib/api";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";
import SocialAuthContainer from "@/containers/SocialAuthContainer";

jest.mock("next/router", () => require("next-router-mock"));

describe("SocialAuth Container", () => {
  beforeEach(() => {
    render(<SocialAuthContainer />, { wrapper: MemoryRouterProvider });
  });

  it("When login google button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new InternalONotFoundApiError("some error"));
    const googleButton = screen.getByTestId("google-button");
    await userEvent.click(googleButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When login google button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const googleButton = screen.getByTestId("google-button");
    await userEvent.click(googleButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When login facebook button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new InternalONotFoundApiError("some error"));
    const facebookButton = screen.getByTestId("facebook-button");
    await userEvent.click(facebookButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When login facebook button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const facebookButton = screen.getByTestId("facebook-button");
    await userEvent.click(facebookButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When login twitter button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new InternalONotFoundApiError("some error"));
    const twitterButton = screen.getByTestId("twitter-button");
    await userEvent.click(twitterButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When login twitter button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const twitterButton = screen.getByTestId("twitter-button");
    await userEvent.click(twitterButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });

  it("When login github button is clicked but a error service occurred should go to error page", async () => {
    jest.spyOn(Api, "post").mockRejectedValue(new InternalONotFoundApiError("some error"));
    const githubButton = screen.getByTestId("github-button");
    await userEvent.click(githubButton);
    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When github button is clicked sucessfully should go to profile page", async () => {
    jest.spyOn(Api, "post").mockResolvedValue({
      ok: true,
      data: { code: 200 },
    });
    const githubButton = screen.getByTestId("github-button");
    await userEvent.click(githubButton);
    expect(mockRouter.asPath).toEqual("/profile");
  });
});
