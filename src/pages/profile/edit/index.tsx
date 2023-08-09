import { UserResponse } from "@/domain/types";
import NavbarLayout from "@/layouts/navbarLayout";
import ContentLayout from "@/layouts/contentLayout";
import SectionInfo from "@/components/SectionInfo";

import { userDummy } from "../../../../test/dummies";
import BackLink from "@/components/BackLink";

import EditProfileForm from "@/components/EditProfileForm";
import { updateUserService } from "@/services/update-service";

type Props = {
  user: UserResponse;
};

export default function EditProfile({ user = userDummy }: Props) {
  return (
    <NavbarLayout user={user}>
      <>
        <BackLink />
        <ContentLayout>
          <div className="px-12">
            <div className="pb-6">
              <SectionInfo
                title="Change Info"
                subtitle="Changes will be reflected to every services"
              />
            </div>

            <EditProfileForm
              initial={user}
              updateProfileService={updateUserService}
            />
          </div>
        </ContentLayout>
      </>
    </NavbarLayout>
  );
}
