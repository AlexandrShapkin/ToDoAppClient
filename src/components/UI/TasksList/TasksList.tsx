import Task from "../../../utils/Task/Task";
import TaskElement from "../TaskElement/TaskElement";

type Props = {
  tasks: Task[];
};

function TasksList({ tasks }: Props) {
  return (
    <ul className="divide-y devide-granite-gray space-y-[1rem]">
      {tasks.map((task) => (
        <TaskElement taskData={task} key={task._id} />
      ))}
    </ul>
  );
}

export default TasksList;
