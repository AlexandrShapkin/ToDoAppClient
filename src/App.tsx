import { createContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

import ToastsContextValue from "./types/ToastsContextValue";
import ToastContainer from "./components/ToastsContainer/ToastsContainer";
import useToasts from "./hooks/useToasts";
import useUser from "./hooks/useUser";

import UserContextValue from "./types/UserContextValue";
import UserController from "./controllers/UserController";

import TasksContextValue from "./types/TasksContextValue";
import TasksController from "./controllers/TasksController";
import Task from "./types/Task";

export const ToastsContext = createContext<ToastsContextValue | null>(null);

export const UserContext = createContext<UserContextValue | null>(null);

export const TasksContext = createContext<TasksContextValue | null>(null);

function App() {
  const [userContextValue] = useUser();
  const [toastsContextValue] = useToasts();

  const refresh = async () => {
    try {
      await UserController.refresh(userContextValue?.setUser);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    if (userContextValue?.username == "") {
      setTasks([]);
      return;
    }
    let resTasks: Task[];
    try {
      resTasks = await TasksController.getTasks();
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
      addedTasks = await TasksController.addTasks(fileTasks);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }

    setTasks([...tasks, ...addedTasks]);
  }

  const setTaskDone = async (task: Task) => {
    let updatedTask: Task;

    try {
      updatedTask = await TasksController.updateTask({
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
      deletedTask = await TasksController.deleteTask(task);
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
      updatedTask = await TasksController.updateTask(task);
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
      newTask = await TasksController.addTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }
  };

  return (
    <>
      <UserContext.Provider value={userContextValue}>
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
      </UserContext.Provider>
    </>
  );
}

export default App;
