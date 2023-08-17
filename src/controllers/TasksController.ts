import TasksService from "../service/TasksService";
import TokenService from "../service/TokenService";
import Task from "../types/Task";

const URL = "http://localhost:3000/api";

export async function getTasks() {
  const token = TokenService.getToken();
  if (!token) {
    return [];
  }
  const response = await TasksService.getTasks(URL, token);
  if (response.message) {
    console.log(response);
    throw Error(response.message);
  }

  return response;
}

export async function updateTask(task: Task) {
  const token = TokenService.getToken();
  if (!token) {
    return task;
  }
  const response = await TasksService.updateTask(URL, token, task);
  if (response.message) {
    console.log(response);
    throw Error(response.message);
  }

  return response;
}

export async function addTask(task: Task) {
  const token = TokenService.getToken();
  if (!token) {
    throw Error("Вы не авторизорованы!");
  }
  const response = await TasksService.addTask(URL, token, task);
  if (response.message) {
    console.log(response);
    throw Error(response.message);
  }

  return response;
}

export default {
  getTasks: getTasks,
  updateTask: updateTask,
  addTask: addTask,
};
