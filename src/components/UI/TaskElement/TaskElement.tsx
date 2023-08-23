import { MdAddTask, MdTaskAlt } from "react-icons/md";
import Task from "../../../types/Task";
import { useContext, useState } from "react";
import TaskModal from "../../TaskModal/TaskModal";
import TimeConverter from "../../../utils/TimeConverter";
import { ToastsContext } from "../../../App";

type Props = {
  taskData: Task;
  setTaskDone(task: Task): Promise<void>;
  deleteTask(task: Task): Promise<void>;
  updateTask(task: Task): Promise<void>;
};

function TaskElement({ taskData, setTaskDone, deleteTask, updateTask }: Props) {
  const toastsContext = useContext(ToastsContext);

  const [showTaskModal, setShowTaskModal] = useState(false);

  const changeTaskModalState = () => {
    setShowTaskModal(!showTaskModal);
  };

  const deleteTaskHandler = async () => {
    try {
      await deleteTask(taskData);
    } catch (error) {
      if (error instanceof Error) {
        toastsContext?.showToast("Ошибка удаления", error.message, "error");
        return;
      }
    }
    toastsContext?.showToast(
      "Задача удалена",
      `Задача ${taskData.header} удалена`,
      "ok"
    );
  }

  return (
    <li className="flex m-auto h-[4rem] w-full md:h-[7rem] md:w-[30rem]">
      <div className="flex justify-center h-[4rem] w-[4rem] md:w-[7rem] md:h-[7rem] ">
        <input
          checked={taskData.isDone}
          onChange={() => setTaskDone(taskData)}
          type="checkbox"
          className="w-[2rem] md:w-[2rem] transition ease-in-out delay-150 hover:scale-110"
        />
      </div>
      <div
        className="ml-[1rem] max-w-[80%] h-[4rem] md:w-[23rem] md:h-[7rem] cursor-pointer"
        onClick={changeTaskModalState}
      >
        <h1 className="text-[1rem] md:text-2xl font-bold truncate">
          {taskData.header}
        </h1>
        <hr className="w-[80%]" />
        <p className="text-[0.5rem] md:text-sm h-[1.5rem] md:h-[3.5rem] hyphens-auto overflow-hidden">
          {taskData.content}
        </p>
        <div className="flex space-x-[1rem] md:justify-between mt-[0.25rem] text-[0.5rem] md:text-[0.75rem] md:h-[0.75rem] w-full">
          <div className="flex">
            <MdAddTask className="md:text-[1rem] m-auto" />
            <p>
              {taskData.addTime
                ? TimeConverter(taskData.addTime)
                : "~~.~~.~~, ~~:~~"}
            </p>
          </div>
          <div className="flex">
            <MdTaskAlt className="md:text-[1rem] m-auto" />
            <p>
              {taskData.doneTime
                ? TimeConverter(taskData.doneTime)
                : "~~.~~.~~, ~~:~~"}
            </p>
          </div>
        </div>
        <TaskModal
          showModal={showTaskModal}
          hideModal={changeTaskModalState}
          taskData={taskData}
          setTaskDone={setTaskDone}
          deleteTask={deleteTaskHandler}
          updateTask={updateTask}
        />
      </div>
    </li>
  );
}

export default TaskElement;
