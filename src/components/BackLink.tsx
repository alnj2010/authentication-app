import Link from "next/link";
import Typography from "./Typography";
import Image from "next/image";

export default function BackLink() {
  return (
    <div className="pb-6 max-w-4xl m-auto">
      <Link data-testid="back-link" href="/profile" className="flex">
        <Image width={18} height={18} src="/left-arrow.svg" alt="left arrow" />
        <Typography variant="label" color="text-blue-light" className="pl-2">
          Back
        </Typography>
      </Link>
    </div>
  );
}
