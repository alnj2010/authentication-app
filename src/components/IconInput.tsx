import Image from "next/image";

type Props = {
  id: string;
  iconSrc: string;
  iconAlt: string;
  type: "text" | "password";
  placeholder: string;
};

export default function IconInput({
  id,
  iconSrc,
  iconAlt,
  type,
  placeholder,
}: Props) {
  return (
    <>
      <label
        htmlFor={id}
        className="block relative h-12 border-gray-light border-solid border rounded-lg"
      >
        <div className="w-12 h-12 flex justify-center items-center">
          <Image src={iconSrc} alt={iconAlt} width={20} height={16} />
        </div>

        <input
          id={id}
          data-testid={id}
          type={type}
          placeholder={placeholder}
          className="absolute w-full top-0 h-[46px] bg-transparent rounded-lg pl-12 pr-5 font-normal text-base text-gray focus:outline-none focus:border-black-light focus:ring-2 focus:ring-black-light"
        />
      </label>
    </>
  );
}
