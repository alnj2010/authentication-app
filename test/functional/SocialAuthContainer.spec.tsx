import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

import "@testing-library/jest-dom";
import { Api } from "@/lib/api";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";
import SocialAuthContainer, {
  authProviders,
} from "@/containers/SocialAuthContainer";

jest.mock("next/router", () => require("next-router-mock"));

describe("SocialAuth Container", () => {
  beforeEach(() => {
    render(<SocialAuthContainer />, { wrapper: MemoryRouterProvider });
  });

  for (let i = 0; i < authProviders.length; i += 1) {
    it(`When ${authProviders[i].id} login link is clicked should go to ${authProviders[i].id} signIn service`, async () => {
      const providerLink = screen.getByTestId(`${authProviders[i].id}-button`);
      await userEvent.click(providerLink);
      expect(mockRouter.asPath).toEqual(`/api/login/${authProviders[i].id}`);
    });
  }
});
