import Menu from "../Menu/Menu";
import HeaderContainer from "../UI/HeaderContainer/HeaderContainer";
import Logo from "../UI/Logo/Logo";

function Header() {
  return (
    <HeaderContainer className="bg-charleston-green">
        <Menu />
        <Logo />
    </HeaderContainer>
  );
}

export default Header;
