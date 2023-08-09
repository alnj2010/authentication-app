import { loginService } from "@/services/login-service";
import AuthLayout from "@/layouts/authLayout";

export default function Login() {
  return (
    <AuthLayout
      authService={loginService}
      id="login"
      sectionTitle="Login"
      submitButtonText="Login"
      backPage="register"
      backText="Don’t have an account yet?"
      backLink="/register"
    />
  );
}
