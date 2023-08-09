import { ReactNode } from "react";
import Typography from "./Typography";

type Props = {
  title: string;
  children: ReactNode;
};

export default function ProfileInfoItem({ title, children }: Props) {
  return (
    <div className="h-24 border-b border-b-gray-secondary flex justify-start items-center sm:border-b-0 sm:border-t sm:border-t-gray-secondary sm:px-12">
      <Typography
        variant="subtitle4"
        color="text-gray-light"
        className="min-w-[155px] sm:w-[280px]"
      >
        {title.toUpperCase()}
      </Typography>
      <div
        className="min-w-[120px] flex justify-end w-full sm:justify-start"
      >
        {children}
      </div>
    </div>
  );
}
