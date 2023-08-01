import Typography from "./Typography";

type Props = {
  title: string;
  id: string;
  type: "text" | "password";
  placeholder: string;
  value?: string;
};

export default function TextField({
  id,
  type,
  placeholder,
  title,
  value = "",
}: Props) {
  return (
    <>
      <label className="block" htmlFor={id}>
        <Typography variant="subtitle4" className="dark:text-gray-secondary">{title}</Typography>
      </label>
      <input
        readOnly
        className="border-gray border-solid border rounded-lg h-12 w-full px-[18px] py-[17px] placeholder-gray-light dark:bg-dark dark:text-gray-secondary"
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
