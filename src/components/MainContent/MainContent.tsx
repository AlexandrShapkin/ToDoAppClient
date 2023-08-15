import { useContext, useEffect, useState } from "react";
import Task from "../../utils/Task/Task";
import TasksList from "../UI/TasksList/TasksList";
import TasksController from "../../controllers/TasksController";
import { UserContext } from "../../App";


function MainContent() {
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
    } catch(error) {
      if (error instanceof Error) {
        setTasks(undefined);
        return;
      }
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [userContext?.username])


  return (
    <main className="m-auto flex flex-col w-full md:w-[70vw]">
      <TasksList tasks={tasks} />
    </main>
  );
}

export default MainContent;
