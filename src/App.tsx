import { createContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

import ToastsContextValue from "./types/ToastsContextValue";
import ToastContainer from "./components/ToastsContainer/ToastsContainer";
import useToasts from "./hooks/useToasts";
import useUser from "./hooks/useUser";

import TasksContextValue from "./types/TasksContextValue";
import TasksController from "./controllers/TaskController";
import Task from "./types/Task";

import { API_URL } from "./env/env";
import FetchTasksService from "./service/FetchTasksService";
import SessionStorageTokenRepo from "./repositories/SessionStorageTokenRepo";
import UserContext from "./context/UserContext";

export const ToastsContext = createContext<ToastsContextValue | null>(null);

export const UserAppContext = createContext<UserContext | null>(null);

export const TasksContext = createContext<TasksContextValue | null>(null);

function App() {
  const [userContextValue] = useUser();
  const [toastsContextValue] = useToasts();

  useEffect(() => {
    userContextValue.refreshUser().catch((error) => {
      if (error instanceof Error) {
        toastsContextValue.showToast("Внимание!", error.message, "alert");
      }
    });
  }, []);

  const taskController = new TasksController(
    API_URL,
    FetchTasksService,
    SessionStorageTokenRepo
  );
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    if (!userContextValue?.isUserAuthorized()) {
      setTasks([]);
      return;
    }
    let resTasks: Task[];
    try {
      resTasks = await taskController.getTasks();
      setTasks(resTasks);
    } catch (error) {
      if (error instanceof Error) {
        setTasks([]);
        return;
      }
    }
  };

  const addTasks = async (fileTasks: Task[]) => {
    let addedTasks: Task[] = [];

    try {
      addedTasks = await taskController.addTasks(fileTasks);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }

    setTasks([...tasks, ...addedTasks]);
  };

  const setTaskDone = async (task: Task) => {
    let updatedTask: Task;

    try {
      updatedTask = await taskController.updateTask({
        ...task,
        isDone: !task.isDone,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }

    const updatedTasks = tasks?.map((task) => {
      if (task._id !== updatedTask._id) {
        return task;
      }

      return {
        ...task,
        ...updatedTask,
      };
    });

    setTasks(updatedTasks);
  };

  const deleteTask = async (task: Task) => {
    let deletedTask: Task;

    try {
      deletedTask = await taskController.deleteTask(task);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }

    const newTasks = tasks?.filter((task) => task._id != deletedTask._id);

    setTasks(newTasks);
  };

  const updateTask = async (task: Task) => {
    let updatedTask: Task;

    try {
      updatedTask = await taskController.updateTask(task);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }

    const updatedTasks = tasks?.map((task) => {
      if (task._id !== updatedTask._id) {
        return task;
      }

      return {
        ...task,
        ...updatedTask,
      };
    });

    setTasks(updatedTasks);
  };

  const addTask = async (task: Task) => {
    let newTask: Task;

    try {
      newTask = await taskController.addTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }
  };

  return (
    <>
      <UserAppContext.Provider value={userContextValue}>
        <ToastsContext.Provider value={toastsContextValue}>
          <TasksContext.Provider
            value={{
              tasks: tasks,
              fetchTasks: fetchTasks,
              addTasks: addTasks,
              setTaskDone: setTaskDone,
              addTask: addTask,
              deleteTask: deleteTask,
              updateTask: updateTask,
            }}
          >
            <Header />
            <MainContent />
            <ToastContainer />
          </TasksContext.Provider>
        </ToastsContext.Provider>
      </UserAppContext.Provider>
    </>
  );
}

export default App;
