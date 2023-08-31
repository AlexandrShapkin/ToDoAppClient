import TasksService from "../service/TasksService";
import TokenService from "../service/TokenService";
import Task from "../types/Task";

class TaskController {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async getTasks() {
    const token = TokenService.getToken();
    if (!token) {
      return [];
    }
    const response = await TasksService.getTasks(this.apiUrl, token);
    if (response.message) {
      console.log(response);
      throw Error(response.message);
    }
  
    return response;
  }

  public async addTasks(tasks: Task[]) {
    const token = TokenService.getToken();
    if (!token) {
      return [];
    }
    const response = await TasksService.addTasks(this.apiUrl, token, tasks);
    if (response.message) {
      console.log(response);
      throw Error(response.message);
    }
  
    return response;
  }

  public async updateTask(task: Task) {
    const token = TokenService.getToken();
    if (!token) {
      return task;
    }
    const response = await TasksService.updateTask(this.apiUrl, token, task);
    if (response.message) {
      console.log(response);
      throw Error(response.message);
    }
  
    return response;
  }

  public async deleteTask(task: Task) {
    const token = TokenService.getToken();
    if (!token) {
      return task;
    }
    const response = await TasksService.deleteTask(this.apiUrl, token, task);
    if (response.message) {
      console.log(response);
      throw Error(response.message);
    }
  
    return response;
  }

  public async addTask(task: Task) {
    const token = TokenService.getToken();
    if (!token) {
      throw Error("Вы не авторизорованы!");
    }
    const response = await TasksService.addTask(this.apiUrl, token, task);
    if (response.message) {
      console.log(response);
      throw Error(response.message);
    }
  
    return response;
  }
}

export default TaskController;
