
type Props = {
  text: string;
};

export default function Button({ text }: Props) {
  return (
    <>
      <button className="w-full h-9 font-semibold text-base rounded-lg bg-blue text-white">
        {text}
      </button>
    </>
  );
}
