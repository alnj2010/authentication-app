import { AuthInfo } from "@/domain/types";

export const userDummy = {
  photo: "/photo.jpg",
  bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti hic voluptates ratione dolores, totam, commodi est quo voluptatem minus porro eaque asperiores. Doloremque unde neque voluptatibus natus non quasi provident.",
  name: "Xanthe Neal",
  phone: "908249274292",
  email: "xanthe.neal@gmail.com",
  password: "******",
};

export const initialUserDummy = {
  photo: "/photo.png",
  bio: "",
  name: "",
  phone: "",
  email: "xanthe.neal@gmail.com",
  password: "******",
};

export const userAuthDummy: AuthInfo = {
  email: userDummy.email,
  password: userDummy.password,
};
