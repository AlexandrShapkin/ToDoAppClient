import Task from "../../../utils/Task/Task";
import TaskElement from "../TaskElement/TaskElement";

import { useContext, useEffect, useState } from "react";

import TasksController from "../../../controllers/TasksController";
import { UserContext } from "../../../App";

function TasksList() {
  const userContext = useContext(UserContext);

  const [tasks, setTasks] = useState<Task[]>();

  const fetchTasks = async () => {
    if (userContext?.username == "") {
      setTasks(undefined);
      return;
    }
    let resTasks: Task[];
    try {
      resTasks = await TasksController.getTasks();
      setTasks(resTasks);
    } catch (error) {
      if (error instanceof Error) {
        setTasks(undefined);
        return;
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userContext?.username]);

  const setTaskDone = async (task: Task) => {
    let updatedTask: Task;

    try {
      updatedTask = await TasksController.updateTask({...task, isDone: !task.isDone});
    } catch(error) {
      if (error instanceof Error) {
        return;
      }
    }

    const updatedTasks = tasks?.map(task => {
      if (task._id !== updatedTask._id) {
        return task;
      }

      return {
        ...task,
        ...updatedTask
      }
    });

    setTasks(updatedTasks);
  }

  return (
    <ul className="divide-y devide-granite-gray space-y-[1rem]">
      {tasks?.map((task) => (
        <TaskElement taskData={task} setTaskDone={setTaskDone} key={task._id} />
      ))}
    </ul>
  );
}

export default TasksList;
