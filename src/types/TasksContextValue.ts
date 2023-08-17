import Task from "./Task";

type TasksContextValue = {
  tasks: Task[];
  fetchTasks(): Promise<void>;
  setTaskDone(task: Task): Promise<void>;
};

export default TasksContextValue;
