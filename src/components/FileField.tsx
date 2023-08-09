import { ChangeEventHandler } from "react";
import Typography from "./Typography";
import Image from "next/image";

type Props = {
  title: string;
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function FileField({ id, title, value, onChange }: Props) {
  return (
    <>
      <input
        multiple={false}
        type="file"
        name={id}
        id={id}
        data-testid={id}
        accept="image/*"
        className="hidden"
        readOnly
        onChange={onChange}
      />
      <label
        className="flex justify-start items-center w-52 cursor-pointer"
        htmlFor={id}
      >
        <div className="w-[72px] h-[72px] relative flex justify-center items-center">
          <div className="absolute opacity-50 w-full h-full bg-camera bg-center bg-black-light bg-no-repeat bg-[length:24px] rounded-md flex justify-center items-center"></div>
          <Image
            className="max-h-full w-auto"
            width={72}
            height={72}
            src={value}
            alt="profile photo"
          />
        </div>

        <Typography
          variant="subtitle4"
          color="text-gray"
          className="pl-7 hidden sm:block"
        >
          {title.toUpperCase()}
        </Typography>
      </label>
    </>
  );
}
