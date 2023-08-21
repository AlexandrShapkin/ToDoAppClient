import TasksList from "../UI/TasksList/TasksList";



function MainContent() {
  return (
    <main className="m-auto flex flex-col w-full md:w-[70vw] h-[95vh] sm:h-[85vh] md:h-[85vh] overflow-y-auto">
      <TasksList />
    </main>
  );
}

export default MainContent;
