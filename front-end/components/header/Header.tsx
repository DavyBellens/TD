import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

type Props = {
  current: string;
  isLoggedIn?: boolean;
};

const Header: React.FC<Props> = ({ current, isLoggedIn }: Props) => {
  return (
    <header role="header" className="p-2 flex gap-10 items-center flex-col">
      <Logo />
      <Nav current={current} isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;
