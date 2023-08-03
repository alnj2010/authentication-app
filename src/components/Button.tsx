import { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  variant?: "primary" | "secundary";
  disabled?: boolean;
};

export default function Button({
  id,
  children,
  variant = "primary",
  disabled = false,
}: Props) {
  let color =
    variant === "primary"
      ? "bg-blue text-white"
      : "bg-white text-gray border-gray border-solid border dark:bg-dark";

  if (disabled) {
    color = "bg-gray-light text-white";
  }
  return (
    <>
      <button
        id={id}
        data-testid={id}
        className={`w-full h-9 font-semibold text-base rounded-lg ${color}`}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
