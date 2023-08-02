import Task from "../../utils/Task/Task";
import TasksList from "../UI/TasksList/TasksList";

const pseudo: Task[] = [
  {
    _id: "64c10f34c888f900e8e22285",
    user: "64c10e42c888f900e8e22275",
    header: "Long Heeeeeeeaaaaaaderrrrrr",
    content:
      "More content content content content content coooooooooooooooooooooontent content content content content content content content content content",
    isDone: true,
    doneTime: null,
    deleteOnCompletion: false,
    group: ["first group"],
    addTime: new Date("2023-07-26T12:19:00.790Z"),
  },
  {
    _id: "64c10f34c888f900e8e22287",
    user: "64c10e42c888f900e8e22275",
    header: "Task 2",
    content: "Task 2 content",
    isDone: false,
    doneTime: null,
    deleteOnCompletion: true,
    group: ["second group"],
    addTime: new Date("2023-07-26T12:19:00.792Z"),
  },
];

function MainContent() {


  const tasks = pseudo;
  return (
    <main className="m-auto flex flex-col w-full md:w-[70vw]">
      <TasksList tasks={tasks} />
    </main>
  );
}

export default MainContent;
