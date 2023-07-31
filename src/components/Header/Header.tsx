import Logo from "../UI/Logo/Logo";
import MenuButton from "../UI/MenuButton/MenuButton";

function Header() {
  return (
    <header className="flex top-0 w-full h-[2.5rem] md:h-[3.5rem] bg-charleston-green">
      <MenuButton />
      <Logo />
    </header>
  );
}

export default Header;
