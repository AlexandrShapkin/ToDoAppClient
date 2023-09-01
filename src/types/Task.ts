type Task = {
  _id?: string;
  user?: string;
  header: string;
  content: string;
  isDone?: boolean;
  addTime?: Date;
  doneTime?: Date | null;
  deleteOnCompletion: boolean;
  group: string[];
}

export default Task;