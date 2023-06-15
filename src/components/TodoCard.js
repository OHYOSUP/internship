import React, { useState } from "react";
import { editTodo } from "../apis/api/editTodo";

function TodoCard({ todo, editedTodoFn, deleteTodoFn }) {
  const [editedTodo, setEditedTodo] = useState(todo.todo);
  const [toggleEdit, setToggleEdit] = useState(false);

  const onEditClick = () => {
    setToggleEdit((prev) => !prev);
  };

  const onCheckedClick = async (e) => {
    e.preventDefault();
    const { id, todo: editedTodo } = todo;
    const updatedTodo = { todo: editedTodo, isCompleted: e.target.checked };
    try {
      const res = await editTodo(id, updatedTodo);
      if (res.status === 200) {
        const { id, todo: editedTodo, isCompleted } = res.data;
        const newTodoData = { id, todo: editedTodo, isCompleted };
        editedTodoFn(newTodoData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onEditChange = (e) => {
    setEditedTodo(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editedTodo === "") {
      alert("할 일을 입력하세요");
      return;
    }
    const { id, isCompleted } = todo;
    const updatedData = { todo: editedTodo, isCompleted };
    try {
      const res = await editTodo(id, updatedData);

      if (res.status === 200) {
        const { id, todo, isCompleted } = res.data;
        const updatedTodo = { id, todo, isCompleted };
        editedTodoFn(updatedTodo);
      }
    } catch (err) {
      console.error(err);
    }
    setToggleEdit(false);
  };

  return (
    <li className="w-[39vw] gap-5 rounded-md flex flex-col justify-around items-center bg-slate-200 p-5">
      <div className="w-full p-3 flex justify-between gap-3 items-center">
        <input
          className="w-5 h-5"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(e) => onCheckedClick(e)}
        />
        {toggleEdit ? (
          <form onSubmit={onSubmit} className="w-full flex justify-center">
            <input
              onChange={(e) => onEditChange(e)}
              value={editedTodo}
              className="w-full text-center h-8  font-semibold"
              type="text"
              placeholder="할 일을 입력하세요"
            />
          </form>
        ) : (
          <span className="w-full h-10 flex justify-center text-center font-semibold">
            {todo.todo}
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEditClick}
          className="bg-[#1D9BF0] w-13 rounded-md p-2 px-2 text-white font-bold"
        >
          수정
        </button>
        <button
          onClick={deleteTodoFn}
          className="bg-[#1D9BF0] w-13 rounded-md p-2 px-2 text-white font-bold"
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoCard;
