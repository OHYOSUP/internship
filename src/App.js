import Gnb from "./components/gnb";
import { Route, Routes } from "react-router-dom";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import Todo from "./routes/todo";

function App() {
  return (
    <div className="w-[50vw] flex flex-col flex-center items-center">
      <Gnb />
      <h1 className="font-bold text-3xl mb-20 mt-20">Your Todo List</h1>    
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
