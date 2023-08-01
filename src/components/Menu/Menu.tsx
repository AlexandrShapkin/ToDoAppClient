import React from "react";
import MenuButton from "../UI/MenuButton/MenuButton";
import SideMenu from "../UI/SideMenu/SideMenu";

function Menu() {
  const [showMenu, setShowMenu] = React.useState(false);
  const onClickHandler = () => setShowMenu(!showMenu)
  return (
    <>
      <MenuButton onClick={onClickHandler} />
      <SideMenu onClick={onClickHandler} showMenu={showMenu} />
    </>
  );
}

export default Menu;
