import Typography from "./Typography";
import Image from "next/image";

type Props = {
  title: string;
  id: string;
  value: string;
};

export default function FileField({ id, title, value }: Props) {
  return (
    <>
      <input type="file" name={id} id={id} className="hidden" readOnly />
      <label
        className="flex justify-start items-center w-52 cursor-pointer"
        htmlFor={id}
      >
        <div className="w-[72px] h-[72px] bg-black-light rounded-md flex justify-center items-center">
          <Image
            width={72}
            height={72}
            src={value}
            alt="profile photo"
            data-testid={id}
          />
        </div>
        <Typography variant="subtitle4" color="text-gray" className="pl-7 hidden sm:block">
          {title.toUpperCase()}
        </Typography>
      </label>
    </>
  );
}
