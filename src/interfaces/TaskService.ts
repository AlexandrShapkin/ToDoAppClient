import ResponseError from "../types/ResponseError";
import Task from "../types/Task";

interface TaskService {
  getTasks(url: string, token: string): Promise<Task[] | ResponseError>;
  addTasks(
    url: string,
    token: string,
    tasks: Task[]
  ): Promise<Task[] | ResponseError>;
  addTask(
    url: string,
    token: string,
    task: Task
  ): Promise<Task | ResponseError>;
  updateTask(
    url: string,
    token: string,
    task: Task
  ): Promise<Task | ResponseError>;
  deleteTask(
    url: string,
    token: string,
    task: Task
  ): Promise<Task | ResponseError>;
}

export default TaskService;