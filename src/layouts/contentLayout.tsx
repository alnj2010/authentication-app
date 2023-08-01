import Image from "next/image";
import type { ReactElement } from "react";
import { Noto_Sans_Display } from "next/font/google";
import Footer from "@/components/Footer";

type Props = {
  children: ReactElement;
};
export default function ContentLayout({ children }: Props) {
  return (
    <section className="max-w-4xl m-auto">
      <div className="mb-4 sm:border-gray-secondary sm:border-solid sm:border sm:rounded-xl sm:pt-7">
        {children}
      </div>
      <Footer />
    </section>
  );
}
