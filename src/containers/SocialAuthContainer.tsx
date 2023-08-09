import Typography from "@/components/Typography";
import { SocialProviders } from "@/domain/types";
import { socialAuthService } from "@/services/social-auth-service";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {};
const authProviders = [
  { id: "google", imgSrc: "/Google.svg" },
  { id: "facebook", imgSrc: "/Facebook.svg" },
  { id: "twitter", imgSrc: "/Twitter.svg" },
  { id: "github", imgSrc: "/Github.svg" },
];

export default function SocialAuthContainer({}: Props) {
  const router = useRouter();

  const handlerSocialAuthButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const provider = e.currentTarget.id;
    try {
      await socialAuthService(provider as SocialProviders);
      router.push("/profile");
    } catch (error) {
      router.push("/500");
    }
  };
  return (
    <div>
      <div className="text-center	pb-6">
        <Typography variant="body2" color="text-gray">
          or continue with these social profile
        </Typography>
      </div>
      <div className=" pb-8">
        <div className="max-w-[224px] m-auto flex justify-between">
          {authProviders.map((item) => (
            <button
              id={item.id}
              onClick={handlerSocialAuthButton}
              className="min-w-[42px]"
              key={item.id}
              data-testid={`${item.id}-button`}
            >
              <Image
                src={item.imgSrc}
                alt={`Sign in with ${item.id}`}
                width={42}
                height={42}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
