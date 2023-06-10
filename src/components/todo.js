import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Todo() {
  const [newTodo, setNewTodo] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const userId = localStorage.getItem("jwt");
  const navigate = useNavigate();
  if (!localStorage.getItem("jwt")) {
    navigate("/signin");
  }
  const toggleIsCompleted = () => {
    setIsCompleted((prev) => !prev);
  };

  const onChageNewTodo = (e) => {
    setNewTodo(e.target.value);
    console.log(newTodo);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/todos", {
          Headers: {
            Authorization: userId,
            "Content-Type": "application/json",
          },
          // id: 1,
          todo: newTodo,
          // isCompleted: false,
          // userId: userId
        })
        .then((res) => {
          console.log(res.data);

          setNewTodo(res.data);
        });
      localStorage.setItem("newtodo", newTodo);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={onSubmit} className="gap-5 flex w-42">
        <input
          onChange={onChageNewTodo}
          value={newTodo}
          data-testid="new-todo-input"
          placeholder="할 일을 입력하세요"
          className="p-2 border-black border"
        />
        <button
          className="bg-[#1D9BF0] w-30 rounded-md p-2 px-4 text-white font-bold"
          data-testid="new-todo-add-button"
        >
          추가
        </button>
      </form>
      <ul className="mt-10 flex flex-col gap-10">
        <li>
          <label>
            <input type="checkbox" checked={toggleIsCompleted} />
            <span>TODO 1</span>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 2</span>
          </label>
        </li>
      </ul>
    </div>
  );
}
