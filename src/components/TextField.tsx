import { ChangeEventHandler } from "react";
import Typography from "./Typography";

type Props = {
  title: string;
  id: string;
  type: "text" | "password";
  placeholder: string;
  readOnly?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function TextField({
  id,
  type,
  placeholder,
  title,
  onChange,
  value = "",
  readOnly = false,
}: Props) {
  return (
    <>
      <label className="block" htmlFor={id}>
        <Typography variant="subtitle4" className="dark:text-gray-secondary">
          {title}
        </Typography>
      </label>
      <input
        readOnly={readOnly}
        onChange={onChange}
        className="border-gray border-solid border rounded-lg h-12 w-full px-[18px] py-[17px] placeholder-gray-light focus:outline-none focus:border-black-light focus:ring-2 focus:ring-black-light dark:text-gray-secondary dark:focus:ring-gray-light dark:bg-dark"
        type={type}
        name={id}
        value={value}
        id={id}
        data-testid={id}
        placeholder={placeholder}
      />
    </>
  );
}
