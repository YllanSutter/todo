import ChangeTodo from "./ChangeTodo";
import { todoType } from "@/types/todoType";
import EditTodoBase from "./EditTodoBase";
import DeleteTodo from "./DeleteTodo";
import { useEffect, useRef } from 'react';

const Todo = ({ todo }: {todo:todoType}) => {
  const marginLeft = todo.indentation !== undefined ? `${todo.indentation * 20}px` : '0';
  const todoStyle = {
    textDecoration: todo.isCompleted === true ? "line-through" : "none",
    opacity: todo.isCompleted === true ?0.5 :1,
    marginLeft: marginLeft,
  };
  return (
    <div className="w-full flex items-center justify-between bg-white py-3 px-20 rounded-2xl" style={todoStyle}>
        <ChangeTodo todo={todo} />
        <EditTodoBase todo={todo} />
        <div className="flex items-center gap-5">
          <DeleteTodo todo={todo}/>
        </div>
    </div>
  );
};

export default Todo;