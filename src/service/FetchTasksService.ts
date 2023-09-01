import Fetcher from "../utils/Fetcher";
import Task from "../types/Task";
import TaskService from "../interfaces/TaskService";
import ResponseError from "../types/ResponseError";

class FetchTaskService implements TaskService {
  public async getTasks(
    url: string,
    token: string
  ): Promise<Task[] | ResponseError> {
    return Fetcher(`${url}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public async addTasks(
    url: string,
    token: string,
    tasks: Task[]
  ): Promise<Task[] | ResponseError> {
    return Fetcher(`${url}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tasks),
    });
  }

  public async addTask(
    url: string,
    token: string,
    task: Task
  ): Promise<Task | ResponseError> {
    return Fetcher(`${url}/tasks/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
  }

  public async updateTask(
    url: string,
    token: string,
    task: Task
  ): Promise<Task | ResponseError> {
    return Fetcher(`${url}/tasks/task`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
  }

  public async deleteTask(
    url: string,
    token: string,
    task: Task
  ): Promise<Task | ResponseError> {
    return Fetcher(`${url}/tasks/task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
  }
}

export default new FetchTaskService();
