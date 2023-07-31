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
        <Typography variant="subtitle4">{title}</Typography>
      </label>
      <textarea
        readOnly
        value={value}
        className="border-gray border-solid border rounded-lg h-24 w-full px-[18px] py-[17px] placeholder-gray-light"
        name={id}
        id={id}
        data-testid={id}
        placeholder={placeholder}
      />
    </>
  );
}
