import { useState } from "react";
import Task from "../../types/Task";
import ModalContainer from "../UI/ModalContainer/ModalContainer";
import TaskShowForm from "../UI/TaskShowForm/TaskShowForm";
import TaskUpdateForm from "../UI/TaskUpdateForm/TaskUpdateForm";

type Props = {
  taskData: Task;
  setTaskDone(): Promise<void>;
  deleteTask(): Promise<void>;
  updateTask(task: Task): Promise<void>;
  showModal: boolean;
  hideModal: () => void;
};

function TaskModal({
  taskData,
  setTaskDone,
  deleteTask,
  updateTask,
  showModal,
  hideModal,
}: Props) {
  const [mode, setMode] = useState(true);

  const changeMode = () => {
    setMode(!mode);
  };

  return (
    <ModalContainer
      showModal={showModal}
      hideModal={hideModal}
      title={taskData.header}
      titleWidth="max-w-[20rem] md:w-full"
    >
      {mode ? (
        <TaskShowForm
          taskData={taskData}
          setTaskDone={setTaskDone}
          deleteTask={deleteTask}
          changeToUpdate={changeMode}
        />
      ) : (
        <TaskUpdateForm
          taskData={taskData}
          updateTask={updateTask}
          deleteTask={deleteTask}
          changeToShow={changeMode}
        />
      )}
    </ModalContainer>
  );
}

export default TaskModal;
