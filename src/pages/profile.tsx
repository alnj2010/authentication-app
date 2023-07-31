import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

import { ReactElement } from "react";
import Typography from "@/components/Typography";
import { Noto_Sans_Display } from "next/font/google";
import Footer from "@/components/Footer";
import ProfileInfoItem from "@/components/ProfileInfoItem";
import { User } from "@/domain/types";
import { userDummy } from "../../test/dummies";

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
    <main className={`py-4 px-5 h-screen ${notoSans.variable} font-sans`}>
      <nav className="flex justify-between mb-9">
        <Image
          src="/devchallenges.svg"
          alt="Vercel Logo"
          className=""
          width={130}
          height={18}
        />
        <div className="w-[32px] h-[32px] bg-black-light  rounded-md"></div>
      </nav>
      <section className="text-center pb-10">
        <div className="pb-2">
          <Typography
            variant="title2"
            className="sm:text-4xl sm:font-normal"
            color="text-black"
          >
            Personal info
          </Typography>
        </div>
        <Typography
          variant="subtitle3"
          className="sm:text-lg sm:font-light"
          color="text-black"
        >
          Basic info, like your name and photo
        </Typography>
      </section>
      <section className="max-w-4xl m-auto">
        <div className="mb-4 sm:border-[#E0E0E0] sm:border-solid sm:border sm:rounded-xl sm:pt-7">
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
                Edit
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
        </div>
        <Footer />
      </section>
    </main>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return page;
};
