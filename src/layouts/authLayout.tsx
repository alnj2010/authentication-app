import type { ReactElement } from "react";
import { Noto_Sans_Display } from "next/font/google";
import Footer from "@/components/Footer";
import DevChallengesPicture from "@/components/DevChallengesPicture";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

type Props = {
  children: ReactElement;
};
export default function AuthLayout({ children }: Props) {
  return (
    <main
      className={`py-4 px-5 h-screen sm:flex sm:justify-center sm:items-center ${notoSans.variable} font-sans text-gray dark:bg-dark`}
    >
      <div className="h-full flex flex-col justify-between sm:block sm:h-auto sm:w-[474px]">
        <div className="sm:h-auto sm:border-gray-light sm:border-solid sm:border sm:rounded-3xl sm:px-14 sm:pt-12 sm:pb-11">
          <div className="pb-7">
            <DevChallengesPicture />
          </div>
          <div className="" data-testid="auth-children">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
