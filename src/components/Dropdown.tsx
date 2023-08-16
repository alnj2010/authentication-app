import { Menu, Transition } from "@headlessui/react";
import Typography from "./Typography";
import Image from "next/image";
import { Fragment } from "react";
import { UserEntity } from "@/domain/types";
import { useRouter } from "next/router";
import { logoutService } from "@/services/logout-service";

function MenuItem({
  title,
  handleMenuItem,
  color = "text-black-light",
  icon,
  "data-testid": dataTestid,
}: {
  color?: "text-black-light" | "text-red";
  title: string;
  handleMenuItem: () => void;
  icon: string;
  "data-testid": string;
}) {
  return (
    <Menu.Item as="div">
      <div
        className="flex items-center px-3 h-10 ui-active:bg-[#F2F2F2] rounded-lg"
        onClick={handleMenuItem}
        data-testid={dataTestid}
      >
        <Image src={icon} alt="" width={16} height={16} />
        <Typography variant="dropdown2" color={color} className="pl-2">
          {title}
        </Typography>
      </div>
    </Menu.Item>
  );
}

type Props = {
  user: UserEntity;
};

export default function Dropdown({ user }: Props) {
  const router = useRouter();

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
            className="mr-3 dark:text-gray-secondary"
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
            className="w-full drop-shadow-md bg-[#FFFFFF] border-gray-secondary border-solid border rounded-xl px-3 py-4"
          >
            <MenuItem
              title="My Profile"
              handleMenuItem={() => {
                router.replace("/profile");
              }}
              icon="/user-circle.svg"
              data-testid="item-profile-link"
            />
            <div className="h-[1px] bg-gray-secondary my-2"></div>
            <MenuItem
              title="Logout"
              handleMenuItem={async () => {
                try {
                  await logoutService();
                  router.replace("/");
                } catch (error) {
                  console.log(error);
                }
              }}
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
