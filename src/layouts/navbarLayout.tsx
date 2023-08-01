import Image from "next/image";
import type { ReactElement } from "react";
import { Noto_Sans_Display } from "next/font/google";
import Dropdown from "@/components/Dropdown";
import { User } from "@/domain/types";
import { userDummy } from "../../test/dummies";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

type Props = {
  children: ReactElement;
  user?: User;
};
export default function NavbarLayout({ children, user = userDummy }: Props) {
  return (
    <main
      className={`py-4 px-5 h-screen ${notoSans.variable} font-sans sm:px-20`}
    >
      <nav className="flex justify-between mb-9 ">
        <Image
          src="/devchallenges.svg"
          alt="Vercel Logo"
          className=""
          width={130}
          height={18}
        />
        <div>
          <Dropdown user={user} />
        </div>
      </nav>
      <div data-testid="nav-children">{children}</div>
    </main>
  );
}
