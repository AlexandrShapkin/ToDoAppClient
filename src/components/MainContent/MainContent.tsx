import TasksList from "../UI/TasksList/TasksList";



function MainContent() {
  return (
    <main className="m-auto flex flex-col w-full md:w-[70vw] h-full overflow-auto">
      <TasksList />
    </main>
  );
}

export default MainContent;
