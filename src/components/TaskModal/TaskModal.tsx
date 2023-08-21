import Task from "../../types/Task";
import TimeConverter from "../../utils/TimeConverter";
import ModalContainer from "../UI/ModalContainer/ModalContainer";

import {AiFillEdit, AiFillDelete} from "react-icons/ai";

type Props = {
  taskData: Task;
  setTaskDone(task: Task): Promise<void>;
  showModal: boolean;
  hideModal: () => void;
};

function TaskModal({ taskData, setTaskDone, showModal, hideModal }: Props) {
  return (
    <ModalContainer
      showModal={showModal}
      hideModal={hideModal}
      title={taskData.header}
      titleWidth="max-w-[20rem] md:w-full"
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mb-[0.5rem]">
          <div className="flex flex-row space-x-[0.5rem]">
          <input
            checked={taskData.isDone}
            onChange={() => setTaskDone(taskData)}
            type="checkbox"
            className="w-[1.5rem] md:w-[2rem] transition ease-in-out delay-150 hover:scale-110"
          />
          <p className="my-auto">{taskData.isDone ? "Выполнено" : "Не выполнено"}</p>
          </div>
          <div className="flex flex-row text-[1.5rem] md:text-[2rem] space-x-[0.5rem]">
            <button><AiFillEdit /></button>
            <button><AiFillDelete /></button>
          </div>
        </div>
        <hr />
        <div className="mt-[1rem] max-h-full">
          <h1 className="font-bold">{taskData.header}</h1>
          <p className="mt-[0.5rem]">{taskData.content}</p>
          <hr className="my-[1rem]" />
          <p className="">
            {taskData.group?.length != 0
              ? `Группы: ${taskData.group?.join("; ")}`
              : null}
          </p>
          <div className="flex flex-col mt-[1rem] text-sm">
            <p>
              Время добавления:{" "}
              {taskData.addTime
                ? TimeConverter(taskData.addTime)
                : "~~.~~.~~, ~~:~~"}
            </p>
            <p>
              Время выполнения:{" "}
              {taskData.doneTime
                ? TimeConverter(taskData.doneTime)
                : "~~.~~.~~, ~~:~~"}
            </p>
            <p>
              Удалять после выполнения:{" "}
              {taskData.deleteOnCompletion ? "Да" : "Нет"}
            </p>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default TaskModal;
