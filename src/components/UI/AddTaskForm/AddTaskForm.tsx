import { FormEvent, useContext, useState } from "react";
import Task from "../../../types/Task";
import { TasksContext, ToastsContext } from "../../../App";

type Props = {
  hideModal: () => void;
};

function AddTaskFrom({ hideModal }: Props) {
  const [newTask, setNewTask] = useState<Task>({header: "", content: "", group: [], deleteOnCompletion: false});
  const tasksContext = useContext(TasksContext);
  const toastsContext = useContext(ToastsContext);

  const addTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await tasksContext?.addTask(newTask);
    } catch(error) {
      if (error instanceof Error) {
        toastsContext?.showToast("Ошибка добавления", error.message, "error");
        return;
      }
    }
    toastsContext?.showToast("Задача добавлена", `Задача ${newTask.header} добавлена`, "ok");
    hideModal();
  };

  const addGroups = (groups: string) => {
    const groupsArray = groups.split("; ");
    setNewTask({ ...newTask, group: groupsArray });
  };

  return (
    <form className="flex flex-col space-y-[1.5rem]" onSubmit={addTaskHandler}>
      <input
        className="h-[2rem] border-inherit border indent-1"
        placeholder="Название"
        type="text"
        value={newTask.header}
        onChange={(e) => {
          setNewTask({ ...newTask, header: e.target.value });
        }}
      />
      <textarea
        className="border-inherit border indent-1"
        cols={60}
        rows={10}
        placeholder="Описание заметки"
        value={newTask.content}
        onChange={(e) => {
          setNewTask({ ...newTask, content: e.target.value });
        }}
      />
      <input
        className="h-[2rem] border-inherit border indent-1"
        placeholder="Группы"
        type="text"
        value={newTask.group?.join("; ")}
        onChange={(e) => {
          addGroups(e.target.value);
        }}
      />
      <div className="flex flex-row">
        <input
          checked={newTask.deleteOnCompletion}
          onChange={(e) => {
            setNewTask({ ...newTask, deleteOnCompletion: e.target.checked });
          }}
          type="checkbox"
          className="h-[1rem] my-auto mr-[0.5rem] border-inherit border indent-1"
        />
        <p>Удалить после завершения задачи?</p>
      </div>
      <button
        type="submit"
        className="h-[2rem] border-0 rounded-lg shadow-lg bg-dark-charcoal text-white"
      >
        Добавить задачу
      </button>
    </form>
  );
}

export default AddTaskFrom;
