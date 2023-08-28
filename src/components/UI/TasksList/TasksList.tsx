import TaskElement from "../TaskElement/TaskElement";

import { ChangeEvent, useContext, useEffect, useState } from "react";

import { UserContext, TasksContext } from "../../../App";

import { AiOutlinePlus } from "react-icons/ai";
import AddTaskModal from "../../AddTaskModal/AddTaskModal";

function TasksList() {
  const userContext = useContext(UserContext);
  const tasksContext = useContext(TasksContext);

  useEffect(() => {
    tasksContext?.fetchTasks();
  }, [userContext?.username]);

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

  return (
    <ul className="divide-y devide-granite-gray mx-auto space-y-[1rem] h-[90vh] sm:h-[80vh] md:h-[86vh] w-full md:w-[30rem]">
      <div className="flex flex-row h-[1rem] justify-between">
        <button className="text-[2rem] ease-in-out delay-150 hover:scale-110" onClick={showModalHandler}>
          <AiOutlinePlus />
        </button>
        <AddTaskModal showModal={showModal} hideModal={showModalHandler} />
        <div>
          <select
            className="h-[2rem] w-[8rem] bg-transparent truncate"
            name=""
            id=""
            value={filter}
            defaultValue={""}
            onChange={changeFilterHandler}
          >
            <option value={""}>{"Без фильтра"}</option>
            {getGroups().map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>
      {tasksContext?.tasks?.map((task) => {
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
