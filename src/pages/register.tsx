import Link from "next/link";
import SocialAuthContainer from "@/containers/SocialAuthContainer";
import { ReactElement } from "react";
import AuthLayout from "@/layouts/authLayout";
import Typography from "@/components/Typography";
import { register } from "@/services/register-service";
import AuthForm from "@/components/AuthForm";

export default function Register() {
  return (
    <>
      <div className="pb-4">
        <Typography variant="title3" className="dark:text-gray-secondary">
          Join thousands of learners from around the world
        </Typography>
      </div>
      <div className="pb-7">
        <Typography variant="subtitle2" className="dark:text-gray-secondary">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </Typography>
      </div>
      <div className="pb-8">
        <AuthForm
          authService={register}
          buttonTitle="Start coding now"
          buttonId="register-button"
        />
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
