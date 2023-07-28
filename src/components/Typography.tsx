import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant:
    | "title1"
    | "title2"
    | "title3"
    | "subtitle1"
    | "subtitle2"
    | "subtitle3"
    | "subtitle4"
    | "body1"
    | "body2"
    | "body3"
    | "label"
    | "button"
    | "dropdown1"
    | "dropdown2";
  color?: "white" | "black" | "gray-light" | "gray" | "blue-light" | "blue";
};

export default function Typography({
  children,
  variant,
  color = "black",
}: Props) {
  const variants = {
    title1: `text-4xl font-normal text-${color}`, //font-size: 36px; font-weight: 400
    title2: `text-2xl font-normal text-${color}`, //font-size: 24px; font-weight: 400
    title3: `text-lg font-semibold text-${color}`, //font-size: 18px; font-weight: 600

    subtitle1: `text-lg font-light text-${color}`, //font-size: 18px; font-weight: 300
    subtitle2: `text-base font-normal text-${color}`, //font-size: 16px; font-weight: 400
    subtitle3: `text-sm font-light text-${color}`, //font-size: 14px; font-weight: 300
    subtitle4: `text-[13px] font-medium text-${color}`, //font-size: 13px; font-weight: 500

    body1: `text-lg font-medium text-${color}`, //font-size: 18px; font-weight: 500
    body2: `text-sm font-normal text-${color}`, //font-size: 14px; font-weight: 400
    body3: `text-sm font-semibold text-${color}`, //font-size: 14px; font-weight: 600

    label: `text-lg font-normal text-${color}`, //font-size: 18px; font-weight: 400
    button: `text-base font-medium text-${color}`, // font-size: 16px; font-weight: 500

    dropdown1: `text-xs font-semibold text-${color}`, //font-size: 12px; font-weight: 700
    dropdown2: `text-xs font-bold text-${color}`, //font-size: 12px; font-weight: 500
  };
  return <div className={variants[variant]}>{children}</div>;
}
