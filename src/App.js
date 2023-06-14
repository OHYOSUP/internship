import Gnb from "./components/gnb";
import { Route, Routes } from 'react-router-dom';
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import Todo from "./components/todo";



function App() {
  return (
    <div className="w-[50vw] flex flex-col flex-center items-center">
      <Gnb />
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/signin"} element={<SignIn />} />
        <Route path={process.env.PUBLIC_URL + "/signup"} element={<SignUp />} />
        <Route path={process.env.PUBLIC_URL + "/todo"} element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
