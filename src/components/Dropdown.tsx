import { Menu, Transition } from "@headlessui/react";
import Typography from "./Typography";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { User } from "@/domain/types";

function MenuItem({
  title,
  redirect,
  color = "text-black-light",
  icon,
  "data-testid": dataTestid,
}: {
  color?: "text-black-light" | "text-red";
  title: string;
  redirect: string;
  icon: string;
  "data-testid": string;
}) {
  return (
    <Menu.Item as="div">
      <Link
        className="flex items-center px-3 h-10 ui-active:bg-[#F2F2F2] rounded-lg"
        href={redirect}
        data-testid={dataTestid}
      >
        <Image src={icon} alt="" width={16} height={16} />
        <Typography variant="dropdown2" color={color} className="pl-2">
          {title}
        </Typography>
      </Link>
    </Menu.Item>
  );
}

type Props = {
  user: User;
};

export default function Dropdown({ user }: Props) {
  return (
    <div className="relative">
      <Menu as="div" className="absolute right-0 w-44">
        <Menu.Button
          className="w-full flex justify-end items-center pb-6"
          data-testid="menu-button"
        >
          <div className="hidden w-[32px] h-[32px] bg-black-light rounded-md mr-3 sm:flex sm:justify-center sm:items-center">
            <Image
              src={user.photo}
              alt="user photo"
              width={32}
              height={32}
              data-testid="menu-user-photo"
            />
          </div>
          <Typography
            variant="dropdown1"
            className="mr-3"
            dataTestid="menu-user-name"
          >
            {user.name}
          </Typography>
          <Image
            src="/chevron-up.svg"
            alt="chevron"
            className="rotate-180 ui-open:rotate-0"
            width={20}
            height={20}
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
           data-testid="menu-items"
            as="div"
            className="w-full drop-shadow-md bg-[#FFFFFF] border-[#E0E0E0] border-solid border rounded-xl px-3 py-4"
          >
            <MenuItem
              title="My Profile"
              redirect="/profile"
              icon="/user-circle.svg"
              data-testid="item-profile-link"
            />
            <div className="h-[1px] bg-[#E0E0E0] my-2"></div>
            <MenuItem
              title="Logout"
              redirect="/"
              color="text-red"
              icon="/logout.svg"
              data-testid="item-logout-link"
            />
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
