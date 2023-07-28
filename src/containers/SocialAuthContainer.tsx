import Image from "next/image";

type Props = {};
const authProviders = [
  { id: "google", imgSrc: "/Google.svg", imgAlt: "Sign in with Google" },
  { id: "facebook", imgSrc: "/Facebook.svg", imgAlt: "Sign in with Facebook" },
  { id: "twitter", imgSrc: "/Twitter.svg", imgAlt: "Sign in with Twitter" },
  { id: "github", imgSrc: "/Github.svg", imgAlt: "Sign in with Github" },
];

export default function SocialAuthContainer({}: Props) {
  return (
    <>
      <div className="flex justify-center">

        <Image
          src="/Google.svg"
          alt="Sign in with Google"
          className="mr-5"
          width={42}
          height={42}
        />
        <Image
          src="/Facebook.svg"
          alt="Sign in with Facebook"
          className="mr-5"
          width={42}
          height={42}
        />
        <Image
          src="/Twitter.svg"
          alt="Sign in with Twitter"
          className="mr-5"
          width={42}
          height={42}
        />
        <Image
          src="/Gihub.svg"
          alt="Sign in with Github"
          className=""
          width={42}
          height={42}
        />
      </div>
    </>
  );
}
