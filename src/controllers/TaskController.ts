import Task from "../types/Task";
import { instanceOfResponseError } from '../types/ResponseError';
import TaskService from '../interfaces/TaskService';
import TokenRepo from "../interfaces/TokenRepo";

class TaskController {
  private apiUrl: string;
  private taskService: TaskService;
  private tokenRepo: TokenRepo;

  constructor(apiUrl: string, taskService: TaskService, tokenRepo: TokenRepo) {
    this.apiUrl = apiUrl;
    this.taskService = taskService;
    this.tokenRepo = tokenRepo;
  }

  public async getTasks() {
    const token = this.tokenRepo.get();
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
    const token = this.tokenRepo.get();
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
    const token = this.tokenRepo.get();
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
    const token = this.tokenRepo.get();
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
    const token = this.tokenRepo.get();
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
