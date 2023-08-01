import Typography from "./Typography";

type Props = {
  title: string;
  id: string;
  placeholder: string;
  value?: string;
};

export default function TextAreaField({
  id,
  placeholder,
  title,
  value = "",
}: Props) {
  return (
    <>
      <label className="block" htmlFor={id}>
        <Typography variant="subtitle4" className="dark:text-gray-secondary">
          {title}
        </Typography>
      </label>
      <textarea
        readOnly
        value={value}
        className="border-gray border-solid border rounded-lg h-24 w-full px-[18px] py-[17px] placeholder-gray-light dark:bg-dark dark:text-gray-secondary"
        name={id}
        id={id}
        data-testid={id}
        placeholder={placeholder}
      />
    </>
  );
}
