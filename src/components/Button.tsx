import { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  variant?: "primary" | "secundary";
};

export default function Button({ id, children, variant = "primary" }: Props) {
  const color =
    variant === "primary"
      ? "bg-blue text-white"
      : "bg-white text-gray border-gray border-solid border dark:bg-dark";
  return (
    <>
      <button
        id={id}
        data-testid={id}
        className={`w-full h-9 font-semibold text-base rounded-lg ${color}`}
      >
        {children}
      </button>
    </>
  );
}
