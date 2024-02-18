import { Gender, Preference } from "@/types";
import React from "react";
import Nav from "./Nav";

type Props = {
  isLoggedIn: boolean;
  gender?: Gender;
  preference?: Preference;
};

const Header: React.FC<Props> = ({ isLoggedIn, gender, preference }: Props) => {
  return (
    <header role="header" className=" flex gap-5 items-center flex-col">
      <Nav isLoggedIn={isLoggedIn} gender={gender} preference={preference} />
    </header>
  );
};

export default Header;
