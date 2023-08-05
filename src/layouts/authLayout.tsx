import type { ReactElement } from "react";
import { Noto_Sans_Display } from "next/font/google";
import Footer from "@/components/Footer";
import DevChallengesPicture from "@/components/DevChallengesPicture";
import Typography from "@/components/Typography";
import AuthForm from "@/components/AuthForm";
import { AuthService } from "@/domain/types";
import SocialAuthContainer from "@/containers/SocialAuthContainer";
import Link from "next/link";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

function capitalize(world: string): string {
  return world.charAt(0).toUpperCase() + world.slice(1);
}

type Props = {
  children?: ReactElement;

  authService: AuthService;

  id: "login" | "register";
  sectionTitle: string;
  submitButtonText: string;
  backPage: "login" | "register";
  backText: string;
  backLink: string;
};
export default function AuthLayout({
  children,
  authService,
  id,
  sectionTitle,
  submitButtonText,
  backPage,
  backText,
  backLink,
}: Props) {
  return (
    <main
      className={`py-4 px-5 h-screen sm:flex sm:justify-center sm:items-center ${notoSans.variable} font-sans text-gray dark:bg-dark`}
    >
      <div className="h-full flex flex-col justify-between sm:block sm:h-auto sm:w-[474px]">
        <div className="sm:h-auto sm:border-gray-light sm:border-solid sm:border sm:rounded-3xl sm:px-14 sm:pt-12 sm:pb-11">
          <div className="pb-7">
            <DevChallengesPicture />
          </div>
          <div>
            <div className="pb-4">
              <Typography variant="title3" className="dark:text-gray-secondary">
                {sectionTitle}
              </Typography>
            </div>
            {children && (
              <div className="pb-7" data-testid="auth-children">
                {children}
              </div>
            )}
            <div className="pb-8">
              <AuthForm
                authService={authService}
                buttonTitle={submitButtonText}
                buttonId={`${id}-button`}
              />
            </div>

            <SocialAuthContainer />

            <div className="text-center">
              <Typography variant="body2" color="text-gray">
                {backText}{" "}
                <Link
                  href={backLink}
                  className="text-blue"
                  data-testid={`${backPage}-link`}
                >
                  {capitalize(backPage)}
                </Link>
              </Typography>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
