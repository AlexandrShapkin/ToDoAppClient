import TokenService from "../service/TokenService";
import Task from "../types/Task";
import { instanceOfResponseError } from '../types/ResponseError';
import TaskService from '../interfaces/TaskService';

class TaskController {
  private apiUrl: string;
  private taskService: TaskService;

  constructor(apiUrl: string, taskService: TaskService) {
    this.apiUrl = apiUrl;
    this.taskService = taskService;
  }

  public async getTasks() {
    const token = TokenService.getToken();
    if (!token) {
      return [];
    }
    const response = await this.taskService.getTasks(this.apiUrl, token);
    if (instanceOfResponseError(response)) {
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
    const response = await this.taskService.addTasks(this.apiUrl, token, tasks);
    if (instanceOfResponseError(response)) {
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
    const response = await this.taskService.updateTask(this.apiUrl, token, task);
    if (instanceOfResponseError(response)) {
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
    const response = await this.taskService.deleteTask(this.apiUrl, token, task);
    if (instanceOfResponseError(response)) {
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
    const response = await this.taskService.addTask(this.apiUrl, token, task);
    if (instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
  
    return response;
  }
}

export default TaskController;
