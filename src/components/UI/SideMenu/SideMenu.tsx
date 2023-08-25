import { ChangeEvent, useContext, useState } from "react";
import HeaderContainer from "../HeaderContainer/HeaderContainer";
import Logo from "../Logo/Logo";
import MenuButton from "../MenuButton/MenuButton";
import UserLabel from "../UserLabel/UserLabel";

import AddTaskModal from "../../AddTaskModal/AddTaskModal";
import { TasksContext, ToastsContext } from "../../../App";
import Task from "../../../types/Task";

type Props = {
  onClick?: () => void;
  showMenu?: boolean;
};

function SideMenu({ onClick, showMenu }: Props) {
  const tasksContext = useContext(TasksContext);
  const toastsContext = useContext(ToastsContext);
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const loadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    if (file.type != "application/json") {
      toastsContext?.showToast(
        "Ошибка загрузки",
        "Неверное расширение файла!",
        "error"
      );
      return;
    }

    const tasks = JSON.parse(await file.text()) as Task[];

    try {
      await tasksContext?.addTasks(tasks);
    } catch (error) {
      if (error instanceof Error) {
        toastsContext?.showToast("Ошибка загрузки", error.message, "error");
      }
    }

    toastsContext?.showToast(
      "Успешная загрузка",
      `Успешная загрузка файла ${file.name}`,
      "ok"
    );
  };

  const downloadFile = () => {
    const tasksJson = `data:application/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(tasksContext?.tasks, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = tasksJson;
    link.download = "tasks.json";

    link.click();    
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
                  <label className="cursor-pointer" htmlFor="loadTasks">
                    <input
                      type="file"
                      id="loadTasks"
                      onChange={loadFileHandler}
                      hidden
                    />
                    Загрузить задачи
                  </label>
                </li>
                <li>
                  <button type="button" onClick={downloadFile}>
                    Выгрузить задачи
                  </button>
                </li>
                <li>
                  <button className="">Список задач</button>
                </li>
              </ul>
            </div>
          </div>
          <AddTaskModal showModal={showModal} hideModal={showModalHandler} />
          <UserLabel />
        </nav>
      </div>
    </>
  );
}

export default SideMenu;
