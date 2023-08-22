import Task from "./Task";

type TasksContextValue = {
  tasks: Task[];
  fetchTasks(): Promise<void>;
  setTaskDone(task: Task): Promise<void>;
  addTask(task: Task): Promise<void>;
  deleteTask(task: Task): Promise<void>;
  updateTask(task: Task): Promise<void>;
};

export default TasksContextValue;
