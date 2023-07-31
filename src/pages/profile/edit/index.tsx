import { ReactElement } from "react";
import { User } from "@/domain/types";
import NavbarLayout from "@/layouts/navbarLayout";
import ContentLayout from "@/layouts/contentLayout";
import SectionInfo from "@/components/SectionInfo";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import TextAreaField from "@/components/TextAreaField";
import FileField from "@/components/FileField";
import { userDummy } from "../../../../test/dummies";
import Link from "next/link";
import Typography from "@/components/Typography";
import Image from "next/image";
import BackLink from "@/components/BackLink";

type Props = {
  user: User;
};

export default function EditProfile({ user = userDummy }: Props) {
  return (
    <div className="px-12">
      <div className="pb-6">
        <SectionInfo
          title="Change Info"
          subtitle="Changes will be reflected to every services"
        />
      </div>

      <form className="pb-11 max-w-md">
        <div className="pb-8">
          <FileField
            id="filefield-edit-user-photo"
            title="CHANGE PHOTO"
            value={user.photo}
          />
        </div>

        <div className="pb-6">
          <TextField
            id="textfield-edit-user-name"
            type="text"
            placeholder="Enter your name..."
            title="Name"
            value={user.name}
          />
        </div>

        <div className="pb-6">
          <TextAreaField
            id="textfield-edit-user-bio"
            placeholder="Enter your bio..."
            title="Bio"
            value={user.bio}
          />
        </div>

        <div className="pb-6">
          <TextField
            id="textfield-edit-user-phone"
            type="text"
            placeholder="Enter your phone..."
            title="Phone"
            value={user.phone}
          />
        </div>

        <div className="pb-6">
          <TextField
            id="textfield-edit-user-email"
            type="text"
            placeholder="Enter your email..."
            title="Email"
            value={user.email}
          />
        </div>

        <div className="pb-6">
          <TextField
            id="textfield-edit-user-password"
            type="password"
            placeholder="Enter your password..."
            title="Password"
            value={user.password}
          />
        </div>

        <div className="w-20">
          <Button id="save-button">Save</Button>
        </div>
      </form>
    </div>
  );
}

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavbarLayout>
      <>
        <BackLink />
        <ContentLayout>{page}</ContentLayout>
      </>
    </NavbarLayout>
  );
};
