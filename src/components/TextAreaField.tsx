import { ChangeEventHandler } from "react";
import Typography from "./Typography";

type Props = {
  title: string;
  id: string;
  placeholder: string;
  value?: string;
  name: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export default function TextAreaField({
  id,
  name = "",
  placeholder,
  title,
  value = "",
  onChange,
}: Props) {
  return (
    <>
      <label className="block" htmlFor={id}>
        <Typography variant="subtitle4" className="dark:text-gray-secondary">
          {title}
        </Typography>
      </label>
      <textarea
        onChange={onChange}
        value={value}
        className="border-gray border-solid border rounded-lg h-24 w-full px-[18px] py-[17px] placeholder-gray-light focus:outline-none focus:border-black-light focus:ring-2 focus:ring-black-light dark:text-gray-secondary dark:focus:ring-gray-light dark:bg-dark"
        name={name}
        id={id}
        data-testid={id}
        placeholder={placeholder}
      />
    </>
  );
}
