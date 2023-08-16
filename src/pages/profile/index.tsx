import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

import Typography from "@/components/Typography";
import ProfileInfoItem from "@/components/ProfileInfoItem";
import { UserEntity } from "@/domain/types";
import { userDummy } from "../../../test/dummies";
import NavbarLayout from "@/layouts/navbarLayout";
import ContentLayout from "@/layouts/contentLayout";
import SectionInfo from "@/components/SectionInfo";
import WelcomeProfilePage from "@/components/WelcomeProfilePage";
import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";
import UserRepository from "@/repositories/user-repository";
import { SECRET_PASSWORD, UNDEFINED_PHOTO } from "@/domain/constants";

export const getServerSideProps = async function ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  try {
    const token = CookieUtil.getAccessToken(req, res);
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

type Props = {
  user: UserEntity;
};

export default function Profile({ user }: Props) {
  const userKeys = ["photo", "name", "bio", "phone", "email", "password"];
  return (
    <NavbarLayout user={user}>
      <>
        <WelcomeProfilePage />
        <ContentLayout>
          <>
            <div className="flex justify-between pb-12 sm:pb-7 sm:px-12 sm:border-b sm:border-b-gray-secondary">
              <SectionInfo
                title="Profile"
                subtitle="Some info may be visible to other people"
              />
              <div className="w-24 flex items-center">
                <Button id="edit-button" variant="secundary">
                  <Link
                    data-testid="edit-link"
                    href="/profile/edit"
                    className="flex justify-center items-center h-full"
                  >
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              {userKeys.map((title) => (
                <ProfileInfoItem key={title} title={title}>
                  {title === "photo" ? (
                    <div className="flex justify-center items-center w-[72px] h-[72px] bg-black-light rounded-md ">
                      <Image
                        src={user.photo}
                        alt="profile photo"
                        width={72}
                        height={72}
                        data-testid={`${title.toLowerCase()}-label`}
                      />
                    </div>
                  ) : (
                    <Typography
                      variant="button"
                      color="text-black-light"
                      className="truncate sm:text-lg sm:font-medium dark:text-gray-secondary"
                      dataTestid={`${title.toLowerCase()}-label`}
                    >
                      {user[title as keyof UserEntity]}
                    </Typography>
                  )}
                </ProfileInfoItem>
              ))}
            </div>
          </>
        </ContentLayout>
      </>
    </NavbarLayout>
  );
}
