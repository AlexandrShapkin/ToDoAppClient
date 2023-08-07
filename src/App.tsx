import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import {login} from "./controllers/UserController";

function App() {
  login({username: "testuser", password: "password"});
  

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}

export default App;
