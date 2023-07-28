import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

import { ReactElement } from "react";
import Typography from "@/components/Typography";
import { Noto_Sans_Display } from "next/font/google";
import Footer from "@/components/Footer";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export default function Profile() {
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
        <div className="w-[32px] h-[32px] bg-black  rounded-md"></div>
      </nav>
      <section className="text-center pb-10">
        <div className="pb-2">
          <Typography variant="title2">Personal info</Typography>
        </div>
        <Typography variant="subtitle3">
          Basic info, like your name and photo
        </Typography>
      </section>
      <section>
        <div>
          <div className="flex justify-between pb-12">
            <div>
              <div className="pb-1">
                <Typography variant="title2">Profile</Typography>
              </div>
              <Typography variant="subtitle4" color="gray">
                Some info may be visible to other people
              </Typography>
            </div>
            <div className="w-24">
              <Button variant="secundary">Edit</Button>
            </div>
          </div>
          <div>
            <div className="h-24 border-b border-b-[#E0E0E0] flex justify-between items-center">
              <Typography variant="subtitle4" color="gray-light">
                PHOTO
              </Typography>
              <div className="w-[72px] h-[72px] bg-black  rounded-md"></div>
            </div>
            <div>Name</div>
            <div>BIO</div>
            <div>Phone</div>
            <div>Email</div>
            <div>Pasword</div>
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
