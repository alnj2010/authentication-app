import Image from "next/image";

export default function DevChallengesPicture() {
  return (
    <picture>
      <source
        srcSet="/devchallenges-light.svg"
        media="(prefers-color-scheme: dark)"
      />
      <Image
        src="/devchallenges.svg"
        alt="devChallenge Logo"
        className=""
        width={130}
        height={18}
      />
    </picture>
  );
}
