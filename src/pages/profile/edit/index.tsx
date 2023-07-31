import { ReactElement } from "react";
import { User } from "@/domain/types";
import NavbarLayout from "@/layouts/navbarLayout";
import ContentLayout from "@/layouts/contentLayout";

type Props = {
  user: User;
};

export default function EditProfile({ user }: Props) {
  return <>edit profile</>;
}

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavbarLayout>
      <ContentLayout>{page}</ContentLayout>
    </NavbarLayout>
  );
};
