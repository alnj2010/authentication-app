import { ChangeEventHandler } from "react";
import Typography from "./Typography";
import Image from "next/image";
import { UNDEFINED_PHOTO } from "@/domain/constants";
import { FileUploadeable } from "@/domain/types";

type Props = {
  title: string;
  id: string;
  value: string | File | null;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function FileField({
  id,
  name = "",
  title,
  value = UNDEFINED_PHOTO,
  onChange,
}: Props) {
  let srcValue;
  if (value) {
    srcValue = typeof value == "string" ? value : URL.createObjectURL(value);
  } else {
    srcValue = UNDEFINED_PHOTO;
  }
  return (
    <>
      <input
        multiple={false}
        type="file"
        name={name}
        id={id}
        data-testid={id}
        accept="image/*"
        className="hidden"
        readOnly
        onChange={onChange}
      />
      <label
        className="flex justify-start items-center w-fit cursor-pointer"
        htmlFor={id}
      >
        <div className="w-[72px] h-[72px] relative flex justify-center items-center">
          <div className="absolute opacity-50 w-full h-full bg-camera bg-center bg-black-light bg-no-repeat bg-[length:24px] rounded-md flex justify-center items-center"></div>
          <Image
            className="max-h-full w-auto"
            width={72}
            height={72}
            src={srcValue}
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
