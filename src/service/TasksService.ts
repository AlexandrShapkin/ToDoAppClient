import Fetcher from "../utils/Fetcher";
import Task from "../types/Task";

export async function getTasks(url: string, token: string) {
  return Fetcher(`${url}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateTask(url: string, token: string, task: Task) {
  return Fetcher(`${url}/tasks/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
}

export async function addTask(url: string, token: string, task: Task) {
  return Fetcher(`${url}/tasks/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
}

export default {
  getTasks: getTasks,
  updateTask: updateTask,
  addTask: addTask
};
