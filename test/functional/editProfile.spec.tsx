import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import EditProfile from "@/pages/profile/edit";
import { initialUserDummy, userDummy } from "../dummies";

import userEvent from "@testing-library/user-event";

import mockRouter from "next-router-mock";

import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { UserSubmit } from "@/domain/types";
import {
  emptyFieldMsg,
  invalidFieldMsg,
  invalidImageFormatMsg,
  lessThan4CharsFieldMsg,
} from "@/lib/validator";
import { Api } from "@/lib/api";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";

jest.mock("@/lib/api");
jest.mock("next/router", () => require("next-router-mock"));

export const userPhotoDummy = new File([new Blob()], "photo.png", {
  type: "image/*",
});

export const invalidUserPhotoDummy = new File(
  [JSON.stringify({ ping: true })],
  "ping.json",
  {
    type: "image/*",
  }
);

const userSubmitDummy: UserSubmit = { ...userDummy, photo: null };

export async function submitEditForm(user: UserSubmit) {
  const textFieldUserPhoto = screen.getByTestId("filefield-edit-user-photo");
  const textFieldUserName = screen.getByTestId("textfield-edit-user-name");
  const textFieldUserBio = screen.getByTestId("textfield-edit-user-bio");
  const textFieldUserPhone = screen.getByTestId("textfield-edit-user-phone");
  const textFieldUserPassword = screen.getByTestId(
    "textfield-edit-user-password"
  );

  if (user.photo) await userEvent.upload(textFieldUserPhoto, user.photo);

  await userEvent.clear(textFieldUserName);
  if (user.name) await userEvent.type(textFieldUserName, user.name);

  await userEvent.clear(textFieldUserBio);
  if (user.bio) await userEvent.type(textFieldUserBio, user.bio);

  await userEvent.clear(textFieldUserPhone);
  if (user.phone) await userEvent.type(textFieldUserPhone, user.phone);

  await userEvent.clear(textFieldUserPassword);
  if (user.password) await userEvent.type(textFieldUserPassword, user.password);

  const saveButton = screen.getByTestId("save-button");
  await userEvent.click(saveButton);
}

describe("Edit Profile page", () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn().mockReturnValue("/temporal-url");
    (Api.put as jest.Mock).mockReset();
  });
  it("Should render properly", () => {
    render(<EditProfile user={userDummy} />);
    screen.getByTestId("filefield-edit-user-photo");
    screen.getByTestId("textfield-edit-user-name");
    screen.getByTestId("textfield-edit-user-bio");
    screen.getByTestId("textfield-edit-user-phone");
    const textFieldUserEmail = screen.getByTestId("textfield-edit-user-email");
    screen.getByTestId("textfield-edit-user-password");

    screen.getByTestId("back-link");

    const saveButton = screen.getByTestId("save-button");
    expect(textFieldUserEmail.hasAttribute("readOnly")).toBeTruthy();
    expect(saveButton.hasAttribute("disabled")).toBeTruthy();
    expect(screen.queryByTestId("error-messages")).toBeNull();
  });

  it("When the back link is clicked should go to profile page", () => {
    render(<EditProfile user={userDummy} />);
    const registerLink = screen.getByTestId("back-link");
    expect(registerLink.getAttribute("href")).toBe("/profile");
  });

  it("When all fields are unchanged then save button is disabled", async () => {
    render(<EditProfile user={initialUserDummy} />);
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("When photo field has filled then save button is enabled", async () => {
    render(<EditProfile user={initialUserDummy} />);

    const fileFieldUserPhoto = screen.getByTestId("filefield-edit-user-photo");
    await userEvent.upload(fileFieldUserPhoto, userPhotoDummy);

    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When photo field has changed then save button is enabled", async () => {
    render(<EditProfile user={userDummy} />);

    const fileFieldUserPhoto = screen.getByTestId("filefield-edit-user-photo");
    await userEvent.upload(fileFieldUserPhoto, userPhotoDummy);

    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When name field has rendered then initial value is setted", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserName = screen.getByTestId<HTMLInputElement>(
      "textfield-edit-user-name"
    );
    expect(textFieldUserName.value).toBe(userDummy.name);
  });

  it("When name field has filled then save button is enabled", async () => {
    render(<EditProfile user={initialUserDummy} />);
    const textFieldUserName = screen.getByTestId("textfield-edit-user-name");
    await userEvent.type(textFieldUserName, "newusername");
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When name field has changed then save button is enabled", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserName = screen.getByTestId("textfield-edit-user-name");
    await userEvent.type(textFieldUserName, "newusername");
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When bio field has rendered then initial value is setted", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserBio = screen.getByTestId<HTMLTextAreaElement>(
      "textfield-edit-user-bio"
    );
    expect(textFieldUserBio.value).toBe(userDummy.bio);
  });

  it("When bio field has filled then save button is enabled", async () => {
    render(<EditProfile user={initialUserDummy} />);
    const textFieldUserBio = screen.getByTestId("textfield-edit-user-bio");
    await userEvent.type(textFieldUserBio, "newbio");
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When bio field has changed then save button is enabled", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserBio = screen.getByTestId("textfield-edit-user-bio");
    await userEvent.type(textFieldUserBio, "newbio");
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When phone field has rendered then initial value is setted", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserPhone = screen.getByTestId<HTMLInputElement>(
      "textfield-edit-user-phone"
    );
    expect(textFieldUserPhone.value).toBe(userDummy.phone);
  });

  it("When phone field has filled then save button is enabled", async () => {
    render(<EditProfile user={initialUserDummy} />);
    const textFieldUserPhone = screen.getByTestId("textfield-edit-user-phone");
    await userEvent.type(textFieldUserPhone, "12345678");
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When phone field has changed then save button is enabled", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserPhone = screen.getByTestId("textfield-edit-user-phone");
    await userEvent.type(textFieldUserPhone, "12345678");
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When email field has rendered then initial value is setted", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserEmail = screen.getByTestId<HTMLInputElement>(
      "textfield-edit-user-email"
    );
    expect(textFieldUserEmail.value).toBe(userDummy.email);
  });


  it("When password field has rendered then initial value is setted", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserPassword = screen.getByTestId<HTMLInputElement>(
      "textfield-edit-user-password"
    );
    expect(textFieldUserPassword.value).toBe(userDummy.password);
  });

  it("When password field has changed then save button is enabled", async () => {
    render(<EditProfile user={userDummy} />);
    const textFieldUserPassword = screen.getByTestId(
      "textfield-edit-user-password"
    );
    await userEvent.type(textFieldUserPassword, "newPassword");
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When edit form is submited but there is a invalid password should show a messages error", async () => {
    render(<EditProfile user={userDummy} />);

    await submitEditForm({
      ...userSubmitDummy,
      password: "00",
    });
    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      lessThan4CharsFieldMsg("password")
    );
  });

  it("When edit form is submited but password is empty should show a messages error", async () => {
    render(<EditProfile user={userDummy} />);

    await submitEditForm({
      ...userSubmitDummy,
      password: "",
    });

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(2);
    expect(errorMessages.textContent).toContain(emptyFieldMsg("password"));
  });

  it("When edit form is submited but there is a invalid phone should show a messages error", async () => {
    render(<EditProfile user={userDummy} />);

    await submitEditForm({
      ...userSubmitDummy,
      phone: "invalid",
    });
    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      invalidFieldMsg("phone")
    );
  });

  it("When edit form is submited but there is a invalid photo should show a messages error", async () => {
    render(<EditProfile user={userDummy} />);

    await submitEditForm({
      ...userSubmitDummy,
      photo: invalidUserPhotoDummy,
    });
    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      invalidImageFormatMsg("photo")
    );
  });

  it("When edit form is submited with valid data but a error service occurred should go to error page", async () => {
    render(<EditProfile user={userDummy} />, { wrapper: MemoryRouterProvider });

    jest
      .spyOn(Api, "put")
      .mockRejectedValue(new InternalONotFoundApiError("some error"));

    await submitEditForm({
      ...userSubmitDummy,
      name: "new name",
    });

    expect(mockRouter.asPath).toEqual("/500");
  });

  it("When edit form is submited with valid data should go to profile page", async () => {
    render(<EditProfile user={userDummy} />, { wrapper: MemoryRouterProvider });
    await submitEditForm({
      ...userSubmitDummy,
      name: "new name",
    });
    const received = Object.fromEntries(
      (Api.put as jest.Mock).mock.calls[0][1]
    );
    expect(Api.put).toHaveBeenCalledTimes(1);
    expect(received.name).toBe("new name");
    expect(received.bio).toBe(userSubmitDummy.bio);
    expect(received.phone).toBe(userSubmitDummy.phone);
    expect(received.password).toBe(userSubmitDummy.password);
    expect(mockRouter.asPath).toEqual("/profile");
  });
});
