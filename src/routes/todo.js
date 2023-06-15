import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import { getTodos } from "../apis/api/getTodo";
import { createTodos } from "../apis/api/createTodo";
import { deleteTodo } from "../apis/api/deletetodo";

export default function Todo() {
  const [todoCard, setTodoCard] = useState([]);
  const [toggleCompleted, setToggleCompleted] = useState(todoCard.isCompleted);
  const isLoggedIn = localStorage.getItem("access_token");
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  const onChageNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.length === 0) {
      alert("할 일을 입력하세요");
    }
    try {
      const res = await createTodos({ todo: newTodo });
      if (res.status === 201) {
        const { id, todo, isCompleted } = res.data;
        const brandnewTodo = { id, todo, isCompleted };
        setTodoCard([brandnewTodo, ...todoCard]);
        setNewTodo("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleIsCompleted = () => {
    setToggleCompleted((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTodos();
        if (res.status === 200) {
          setTodoCard(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const editedTodoFn = (newTodo) => {
    const newTodos = todoCard.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoCard(newTodos);
  };

  const deleteTodoFn = async (e, id) => {
    e.preventDefault();
    try {
      const res = await deleteTodo(id);
      if (res.status === 204) {
        let newTodo = todoCard.filter((todo) => todo.id !== id);
        setTodoCard(newTodo);
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  const todoInputRef = useRef();
  console.log(todoInputRef.current);

  const onClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다");
      navigate("/signin");
    }
  };

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     alert("로그인이 필요합니다");
  //     navigate("/signin");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={onSubmit} className="gap-5 flex w-42">
        <input
          onChange={onChageNewTodo}
          onClick={onClick}
          value={newTodo}
          data-testid="new-todo-input"
          placeholder="할 일을 입력하세요"
          className="p-2 border-black border"
          ref={todoInputRef}
        />
        <button
          className="bg-[#1D9BF0] w-30 rounded-md p-2 px-4 text-white font-bold"
          data-testid="new-todo-add-button"
        >
          추가
        </button>
      </form>

      <ul className="mt-10 flex flex-col gap-10">
        {todoCard?.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            toggleIsCompleted={toggleIsCompleted}
            deleteTodoFn={(e) => deleteTodoFn(e, todo.id)}
            editedTodoFn={editedTodoFn}
          />
        ))}
      </ul>
    </div>
  );
}
