import Image from "next/image";
import type { ReactElement } from "react";
import { Noto_Sans_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Typography from "@/components/Typography";
import Dropdown from "@/components/Dropdown";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

type Props = {
  children: ReactElement;
};
export default function NavbarLayout({ children }: Props) {
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
        <div>
          <Dropdown />
        </div>
      </nav>
      {children}
    </main>
  );
}
