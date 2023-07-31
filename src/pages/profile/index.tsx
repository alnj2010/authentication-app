import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

import { ReactElement } from "react";
import Typography from "@/components/Typography";
import { Noto_Sans_Display } from "next/font/google";
import ProfileInfoItem from "@/components/ProfileInfoItem";
import { User } from "@/domain/types";
import { userDummy } from "../../../test/dummies";
import NavbarLayout from "@/layouts/navbarLayout";
import ContentLayout from "@/layouts/contentLayout";
import PersonalInfo from "@/components/PersonalInfo";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export async function getServerSideProps() {
  const user: User = userDummy;
  return {
    props: { user },
  };
}

type Props = {
  user: User;
};

export default function Profile({ user }: Props) {
  const userKeys = Object.keys(user);
  return (
    <>
      <div className="flex justify-between pb-12 sm:pb-7 sm:px-12 sm:border-b sm:border-b-[#E0E0E0]">
        <div>
          <div className="pb-1">
            <Typography variant="title2" color="text-black">
              Profile
            </Typography>
          </div>
          <Typography variant="subtitle4" color="text-gray">
            Some info may be visible to other people
          </Typography>
        </div>
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
              <Image
                src={user.photo}
                alt="profile photo"
                width={72}
                height={72}
                data-testid={`${title.toLowerCase()}-label`}
              />
            ) : (
              <Typography
                variant="button"
                color="text-black-light"
                className="truncate sm:text-lg sm:font-medium"
                dataTestid={`${title.toLowerCase()}-label`}
              >
                {user[title as keyof User]}
              </Typography>
            )}
          </ProfileInfoItem>
        ))}
      </div>
    </>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavbarLayout>
      <>
        <PersonalInfo />
        <ContentLayout>{page}</ContentLayout>
      </>
    </NavbarLayout>
  );
};
