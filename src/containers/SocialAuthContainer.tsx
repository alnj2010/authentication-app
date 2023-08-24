import Typography from "@/components/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {};
export const authProviders = [
  { id: "google", imgSrc: "/Google.svg" },
  { id: "facebook", imgSrc: "/Facebook.svg" },
  { id: "twitter", imgSrc: "/Twitter.svg" },
  { id: "github", imgSrc: "/Github.svg" },
];

export default function SocialAuthContainer({}: Props) {
  const router = useRouter();

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
            <Link
              id={item.id}
              href={`/api/login/${item.id}`}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
