import Image from "next/image";
import { Noto_Sans_Display } from "next/font/google";
import Link from "next/link";
const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export default function Home() {
  return (
    <main
      className={`py-4 px-5 h-screen sm:flex sm:justify-center sm:items-center ${notoSans.variable} font-sans text-gray`}
    >
      <div className="h-full flex flex-col justify-between sm:block sm:h-auto sm:w-[474px]">
        <div className="sm:h-[544px] sm:border-gray-light sm:border-solid sm:border sm:rounded-3xl	 sm:px-14 sm:pt-12">
          <div className="pb-7">
            <Image
              src="/devchallenges.svg"
              alt="Vercel Logo"
              className=""
              width={130}
              height={18}
            />
          </div>
          <div className="">
            <div className="pb-7 font-semibold text-lg text-black">Login</div>
            <div className="pb-8">
              <form action="">
                <div className="pb-3.5">
                  <input type="text" placeholder="Email" />
                </div>
                <div className="pb-6">
                  <input type="password" placeholder="password" />
                </div>

                <button className="w-full h-9 font-semibold text-base rounded-lg bg-blue text-white">Login</button>
              </form>
            </div>
            <div>
              <div className="text-center	pb-6 font-normal text-sm">
                or continue with these social profile
              </div>
              <div className="flex justify-center pb-8">
                <Image
                  src="/Google.svg"
                  alt="x"
                  className="mr-5"
                  width={42}
                  height={42}
                />
                <Image
                  src="/Facebook.svg"
                  alt="x"
                  className="mr-5"
                  width={42}
                  height={42}
                />
                <Image
                  src="/Twitter.svg"
                  alt="x"
                  className="mr-5"
                  width={42}
                  height={42}
                />
                <Image
                  src="/Gihub.svg"
                  alt="x"
                  className=""
                  width={42}
                  height={42}
                />
              </div>
            </div>
            <div className="text-center font-normal text-sm">
              Don’t have an account yet? <Link href="/register" className="text-blue">Register</Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between font-normal text-sm">
          <div>create by <span className="font-semibold text-sm underline">alnj2010</span></div>
          <div>devChallenge.io</div>
        </div>
      </div>
    </main>
  );
}
