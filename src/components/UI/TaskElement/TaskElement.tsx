import { MdAddTask, MdTaskAlt } from "react-icons/md";
import Task from "../../../utils/Task/Task";
import React from "react";

type Props = {
  taskData: Task;
};

function TaskElement({ taskData }: Props) {
  const [isDone, setIsDone] = React.useState(taskData.isDone);

  React.useEffect(() => {
    console.log(`${taskData.header}(${taskData._id} setted ${isDone})`);
  }, [isDone, taskData.header, taskData._id]);

  return (
    <li className="flex m-auto h-[4rem] w-full md:h-[7rem] md:w-[30rem]">
      <div className="flex justify-center h-[4rem] w-[4rem] md:w-[7rem] md:h-[7rem] ">
        <input
          checked={isDone}
          onChange={() => setIsDone(!isDone)}
          type="checkbox"
          className="w-[2rem] md:w-[2rem] transition ease-in-out delay-150 hover:scale-110"
        />
      </div>
      <div className="ml-[1rem] w-full h-[4rem] md:w-full md:h-[7rem]">
        <h1 className="text-[1rem] md:text-2xl font-bold truncate">{taskData.header}</h1>
        <hr className="w-[90%]" />
        <p className="text-[0.5rem] md:text-sm h-[1.5rem] md:h-[3.5rem] hyphens-auto overflow-hidden">{taskData.content}</p>
        <div className="flex space-x-[1rem] md:justify-between mt-[0.25rem] text-[0.5rem] md:text-[0.75rem] md:h-[0.75rem] w-full">
          <div className="flex">
            <MdAddTask className="md:text-[1rem] m-auto" />
            <p>{taskData.addTime.toLocaleString("ru-Ru", {day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit"})}</p>
          </div>
          <div className="flex">
            <MdTaskAlt className="md:text-[1rem] m-auto" />
            <p>{taskData.doneTime ? taskData.addTime.toLocaleString("ru-Ru", {day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit"}) : "~~.~~.~~, ~~:~~"}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TaskElement;
