import HeaderContainer from "../HeaderContainer/HeaderContainer";
import Logo from "../Logo/Logo";
import MenuButton from "../MenuButton/MenuButton";

import { PiUserCircle } from "react-icons/pi";

type Props = {
  onClick?: () => void;
  showMenu?: boolean;
};

function SideMenu({ onClick, showMenu }: Props) {
  return (
    <div
      className={`w-screen h-screen absolute top-0 left-0 ease-out duration-200 md:duration-300 ${
        showMenu ? "translate-x-0" : "-translate-x-[100vw]"
      }`}
      onClick={onClick}
    >
      <nav
        className={`grid grid-rows-1 w-[24rem] min-h-[100%] bg-dark-charcoal`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <HeaderContainer className="bg-dark-charcoal justify-between">
            <Logo />
            <MenuButton onClick={onClick} />
          </HeaderContainer>
          <div className="h-[70%] overflow-auto">
            <ul className="h-[70%] m-[2rem] min-w-[18rem] divide-y devide-[#666655] leading-10 text-white font-bold text-xl">
              <li>
                <button className="">Добавить задачу</button>
              </li>
              <li>
                <button className="">Список задач</button>
              </li>
              <li>
                <p className="">Группы</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex overflow-hidden m-[2rem] min-w-[18rem] h-[3rem]">
          <div className="my-auto flex text-white font-bold">
            <PiUserCircle className="text-3xl md:text-4xl" />
            <p className="mx-2 text-xl md:text-2xl">User...</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideMenu;
