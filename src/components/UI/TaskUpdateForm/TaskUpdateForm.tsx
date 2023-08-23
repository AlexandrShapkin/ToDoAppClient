import { FormEvent, useContext, useState } from "react";
import Task from "../../../types/Task";

import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { ToastsContext } from "../../../App";

type Props = {
  taskData: Task;
  updateTask(task: Task): Promise<void>;
  deleteTask(task: Task): Promise<void>;
  changeToShow(): void;
};

function TaskUpdateForm({
  taskData,
  updateTask,
  deleteTask,
  changeToShow,
}: Props) {
  const toastsContext = useContext(ToastsContext);

  const [task, setTask] = useState(taskData);

  const updateTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateTask(task);
    } catch (error) {
      if (error instanceof Error) {
        toastsContext?.showToast("Ошибка обновления", error.message, "error");
        return;
      }
    }
    toastsContext?.showToast(
      "Задача обновлена",
      `Задача ${task.header} обновлена`,
      "ok"
    );
  };

  const addGroups = (groups: string) => {
    const groupsArray = groups.split("; ");
    setTask({ ...task, group: groupsArray });
  };

  return (
    <form className="flex flex-col" onSubmit={updateTaskHandler}>
      <div className="flex flex-row justify-between mb-[0.5rem]">
        <button
          type="submit"
          className="h-[2rem] border-0 rounded-lg shadow-lg bg-dark-charcoal text-white px-[0.5rem]"
        >
          Обновить
        </button>
        <div className="flex flex-row text-[1.5rem] md:text-[2rem] space-x-[0.5rem]">
          <button onClick={changeToShow}>
            <AiFillEye />
          </button>
          <button type="button" onClick={() => deleteTask(taskData)}>
            <AiFillDelete />
          </button>
        </div>
      </div>
      <hr />
      <div className="flex flex-col mt-[1rem] max-h-full">
        <input
          className="font-bold"
          type="text"
          value={task.header}
          onChange={(e) => {
            setTask({ ...task, header: e.target.value });
          }}
        />
        <textarea
          cols={60}
          rows={5}
          placeholder="Описание заметки"
          value={task.content}
          onChange={(e) => {
            setTask({ ...task, content: e.target.value });
          }}
          className="mt-[0.5rem] w-[20rem] md:w-[25rem]"
        />
        <hr className="my-[1rem]" />
        <input
          className="h-[2rem] border-inherit border indent-1"
          placeholder="Группы"
          type="text"
          value={task.group?.join("; ")}
          onChange={(e) => {
            addGroups(e.target.value);
          }}
        />
        <div className="flex flex-row mt-[1rem] text-sm">
          <input
            checked={task.deleteOnCompletion}
            onChange={(e) => {
              setTask({ ...task, deleteOnCompletion: e.target.checked });
            }}
            type="checkbox"
            className="h-[1rem] my-auto mr-[0.5rem] border-inherit border indent-1"
          />
          <p>Удалить после завершения задачи?</p>
        </div>
      </div>
    </form>
  );
}

export default TaskUpdateForm;
