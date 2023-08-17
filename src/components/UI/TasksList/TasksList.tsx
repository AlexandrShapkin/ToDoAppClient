import TaskElement from "../TaskElement/TaskElement";

import { useContext, useEffect } from "react";

import { UserContext, TasksContext } from "../../../App";

function TasksList() {
  const userContext = useContext(UserContext);
  const tasksContext = useContext(TasksContext);

  useEffect(() => {
    tasksContext?.fetchTasks();
  }, [userContext?.username]);


  return (
    <ul className="divide-y devide-granite-gray space-y-[1rem]">
      {tasksContext?.tasks?.map((task) => (
        <TaskElement taskData={task} setTaskDone={tasksContext?.setTaskDone} key={task._id} />
      ))}
    </ul>
  );
}

export default TasksList;
