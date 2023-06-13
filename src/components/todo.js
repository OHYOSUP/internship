import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../apis/utils/instance";
import TodoCard from "./TodoCard";

export default function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const [todoCard, setTodoCard] = useState([]);
  const [toggleCompleted, setToggleCompleted] = useState(todoCard.isCompleted);

  const navigate = useNavigate();
  if (!localStorage.getItem("access_token")) {
    navigate("/signin");
  }
  const toggleIsCompleted = () => {
    setToggleCompleted((prev) => !prev);
  };

  const onChageNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("todos", { todo: newTodo });
      console.log(res.data);
      if (res.status === 201) {
        const { id, todo, isCompleted } = res.data;
        const brandnewTodo = { id, todo, isCompleted };
        setTodoCard([...todoCard, brandnewTodo]);
        setNewTodo("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("todos");
        console.log(res);
        setTodoCard(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    console.log(todoCard);
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

  const deleteTodoFn = async (e, id)=>{    
      e.preventDefault();      
      try{
        const res = await apiClient.delete(`todos/${id}`, id)
        console.log(res.data)
        if(res.status===204){
          let newTodo = todoCard.filter(todo => todo.id !== id)
          setTodoCard(newTodo)
        }
        
      }catch(err){
        console.error(err)
      }
      
  
    
  }
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
        {todoCard?.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            toggleIsCompleted={toggleIsCompleted}
            deleteTodoFn = {(e)=> deleteTodoFn(e, todo.id)}
            editedTodoFn={editedTodoFn}
          />
        ))}
      </ul>
    </div>
  );
}
