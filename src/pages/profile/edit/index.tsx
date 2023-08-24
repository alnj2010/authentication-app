import { NextApiRequest, NextApiResponse } from "next";

import { UserEntity } from "@/domain/types";
import NavbarLayout from "@/layouts/navbarLayout";
import ContentLayout from "@/layouts/contentLayout";
import SectionInfo from "@/components/SectionInfo";

import BackLink from "@/components/BackLink";

import EditProfileForm from "@/components/EditProfileForm";
import { updateUserService } from "@/services/update-service";

import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";
import UserRepository from "@/repositories/user-repository";
import { SECRET_PASSWORD, UNDEFINED_PHOTO } from "@/domain/constants";

type Props = {
  user: UserEntity;
};

export const getServerSideProps = async function ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  try {
    const token = CookieUtil.get("access_token", req, res);
    const id = TokenUtil.verifyTokenAndGetSub(token);
    const user = await UserRepository.getUserById(id);

    user.password = SECRET_PASSWORD;
    user.photo =
      !user.photo || user.photo === "" ? UNDEFINED_PHOTO : user.photo;

    return {
      props: { user },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default function EditProfile({ user }: Props) {
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
              redirectTo="/profile"
            />
          </div>
        </ContentLayout>
      </>
    </NavbarLayout>
  );
}
