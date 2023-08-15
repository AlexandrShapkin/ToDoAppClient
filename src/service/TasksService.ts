import Fetcher from "../utils/Fetcher";

export async function getTasks(url: string, token: string) {
  return Fetcher(`${url}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

export default {
  getTasks: getTasks
}