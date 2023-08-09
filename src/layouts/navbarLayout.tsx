import type { ReactElement } from "react";
import { Noto_Sans_Display } from "next/font/google";
import Dropdown from "@/components/Dropdown";
import { UserResponse } from "@/domain/types";
import DevChallengesPicture from "@/components/DevChallengesPicture";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

type Props = {
  children: ReactElement;
  user: UserResponse;
};
export default function NavbarLayout({ children, user }: Props) {
  return (
    <main
      className={`py-4 px-5 h-screen ${notoSans.variable} font-sans sm:px-20 dark:bg-dark`}
    >
      <nav className="flex justify-between mb-9 ">
        <DevChallengesPicture />
        <div>
          <Dropdown user={user} />
        </div>
      </nav>
      <div data-testid="nav-children">{children}</div>
    </main>
  );
}
