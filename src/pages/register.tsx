import Link from "next/link";
import IconInput from "@/components/IconInput";
import Button from "@/components/Button";
import SocialAuthContainer from "@/containers/SocialAuthContainer";
import { ReactElement } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Typography from "@/components/Typography";

export default function Register() {
  return (
    <>
      <div className="pb-4">
        <Typography variant="title3">
          Join thousands of learners from around the world
        </Typography>
      </div>
      <div className="pb-7">
        <Typography variant="subtitle2">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </Typography>
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
          <Button id="register-button">Start coding now</Button>
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
          Already a member?{" "}
          <Link href="/" className="text-blue" data-testid="login-link">
            Login
          </Link>
        </Typography>
      </div>
    </>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
