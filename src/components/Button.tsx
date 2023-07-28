type Props = {
  children: string;
  variant?: "primary" | "secundary";
};

export default function Button({ children, variant = "primary" }: Props) {
  const color =
    variant === "primary" ? "bg-blue text-white" : "bg-white text-gray border-gray border-solid border";
  return (
    <>
      <button
        className={`w-full h-9 font-semibold text-base rounded-lg ${color}`}
      >
        {children}
      </button>
    </>
  );
}
