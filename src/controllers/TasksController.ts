import TasksService from "../service/TasksService";
import TokenService from "../service/TokenService";

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

export default {
  getTasks: getTasks
}