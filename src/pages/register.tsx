import AuthLayout from "@/layouts/authLayout";
import Typography from "@/components/Typography";
import { registerService } from "@/services/register-service";

export default function Register() {
  return (
    <AuthLayout
      authService={registerService}
      id="register"
      sectionTitle="Join thousands of learners from around the world"
      submitButtonText="Start coding now"
      backPage="login"
      backText="Already a member?"
      backLink="/"
    >
      <Typography variant="subtitle2" className="dark:text-gray-secondary">
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </Typography>
    </AuthLayout>
  );
}
