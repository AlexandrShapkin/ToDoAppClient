import TaskElement from "../TaskElement/TaskElement";

import { ChangeEvent, useContext, useEffect, useState } from "react";

import { UserAppContext, TasksContext } from "../../../App";

import { AiOutlinePlus } from "react-icons/ai";
import AddTaskModal from "../../AddTaskModal/AddTaskModal";
import Task from "../../../types/Task";

function TasksList() {
  const userContext = useContext(UserAppContext);
  const tasksContext = useContext(TasksContext);

  useEffect(() => {
    tasksContext?.fetchTasks();
  }, [userContext?.isUserAuthorized()]);

  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const [filter, setFilter] = useState<string>("");

  const changeFilterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const getGroups = () => {
    const groups = Array<string>();

    tasksContext?.tasks.forEach((task) => {
      task.group?.forEach((group) => {
        if (groups.indexOf(group) == -1) {
          groups.push(group);
        }
      });
    });

    return groups;
  };

  type TaskField = keyof Task;
  const sortFields = [
    ["Время добавления", "addTime"],
    ["Время выполнения", "doneTime"],
    ["Название", "header"],
  ];
  const [sorter, setSorter] = useState<TaskField>(
    sortFields[0][1] as TaskField
  );

  const changeSorterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSorter(e.target.value as TaskField);
  };

  return (
    <ul className="divide-y devide-granite-gray mx-auto space-y-[1rem] h-[90vh] sm:h-[80vh] md:h-[86vh] w-full md:w-[30rem]">
      <div className="flex flex-row h-[1rem] justify-between">
        <button
          className="text-[2rem] ease-in-out delay-150 hover:scale-110"
          onClick={showModalHandler}
        >
          <AiOutlinePlus />
        </button>
        <AddTaskModal showModal={showModal} hideModal={showModalHandler} />
        <div>
          <select
            className="h-[2rem] w-[8rem] bg-transparent truncate"
            name="filter"
            id="filter"
            value={filter}
            onChange={changeFilterHandler}
          >
            <option value={""}>{"Без фильтра"}</option>
            {getGroups().map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <select
            className="h-[2rem] w-[11rem] bg-transparent truncate"
            onChange={changeSorterHandler}
          >
            {sortFields.map((sortField) => (
              <option key={sortField[1]} value={sortField[1]}>
                {sortField[0]}
              </option>
            ))}
          </select>
        </div>
      </div>
      {tasksContext?.tasks
        ?.sort((a, b) => {
          if (!a[sorter]) {
            return 1;
          } else if (!b[sorter]) {
            return -1;
          } else if (a[sorter]! > b[sorter]!) {
            return 1;
          } else if (a[sorter]! < b[sorter]!) {
            return -1;
          }
          return 0;
        })
        .map((task) => {
          if (filter == "") {
            return (
              <TaskElement
                taskData={task}
                setTaskDone={tasksContext?.setTaskDone}
                deleteTask={tasksContext?.deleteTask}
                updateTask={tasksContext?.updateTask}
                key={task._id}
              />
            );
          } else if (task.group && filter && task.group.indexOf(filter) != -1) {
            return (
              <TaskElement
                taskData={task}
                setTaskDone={tasksContext?.setTaskDone}
                deleteTask={tasksContext?.deleteTask}
                updateTask={tasksContext?.updateTask}
                key={task._id}
              />
            );
          }
        })}
    </ul>
  );
}

export default TasksList;
