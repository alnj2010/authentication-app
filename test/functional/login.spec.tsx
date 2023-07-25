import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../src/pages";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("Should render properly", () => {
    screen.debug();
  });
});
