import { useState } from "react";
import HeaderContainer from "../HeaderContainer/HeaderContainer";
import Logo from "../Logo/Logo";
import MenuButton from "../MenuButton/MenuButton";
import UserLabel from "../UserLabel/UserLabel";

import AddTaskModal from "../../AddTaskModal/AddTaskModal";

type Props = {
  onClick?: () => void;
  showMenu?: boolean;
};

function SideMenu({ onClick, showMenu }: Props) {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <>
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
              <ul className="h-[70%] m-[2rem] min-w-[18rem] divide-y devide-granite-gray leading-10 text-white font-bold text-xl">
                <li>
                  <button className="" onClick={showModalHandler}>
                    Добавить задачу
                  </button>
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
          <UserLabel />
        </nav>
      </div>
      <AddTaskModal showModal={showModal} hideModal={showModalHandler} />
    </>
  );
}

export default SideMenu;
