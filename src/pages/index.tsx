import Link from "next/link";
import IconInput from "@/components/IconInput";
import Button from "@/components/Button";
import SocialAuthContainer from "@/containers/SocialAuthContainer";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import AuthLayout from "@/layouts/authLayout";
import Typography from "@/components/Typography";
import AuthForm from "@/components/AuthForm";

export default function Login() {
  return (
    <>
      <div className="pb-7">
        <Typography variant="title3" className="dark:text-gray-secondary">
          Login
        </Typography>
      </div>
      <div className="pb-8">
        <AuthForm />
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
