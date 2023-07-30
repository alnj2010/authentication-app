import Link from "next/link";
import IconInput from "@/components/IconInput";
import Button from "@/components/Button";
import SocialAuthContainer from "@/containers/SocialAuthContainer";
import { ReactElement } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Typography from "@/components/Typography";

export default function Login() {
  return (
    <>
      <div className="pb-7">
        <Typography variant="title3">Login</Typography>
      </div>
      <div className="pb-8">
        <form action="">
          <div className="mb-3.5">
            <IconInput
              id="textfield-user-email"
              iconSrc="/mail.svg"
              iconAlt="mail icon"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <IconInput
              id="textfield-user-password"
              iconSrc="/lock.svg"
              iconAlt="lock icon"
              type="password"
              placeholder="Password"
            />
          </div>
          <Button id="login-button">Login</Button>
        </form>
      </div>
      <div>
        <div className="text-center	pb-6">
          <Typography variant="body2" color="text-gray">
            or continue with these social profile
          </Typography>
        </div>
        <div className=" pb-8">
          <SocialAuthContainer />
        </div>
      </div>
      <div className="text-center">
        <Typography variant="body2" color="text-gray">
          Don’t have an account yet?{" "}
          <Link
            href="/register"
            className="text-blue"
            data-testid="register-link"
          >
            Register
          </Link>
        </Typography>
      </div>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
