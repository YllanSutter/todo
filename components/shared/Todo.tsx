import ChangeTodo from "./ChangeTodo";
import { todoType } from "@/types/todoType";
import EditTodoBase from "./EditTodoBase";
import DeleteTodo from "./DeleteTodo";
import HideTodoChild from "./HideTodoChild";
import { useEffect, useRef } from 'react';
import { before } from "node:test";

const Todo = ({ todo }: {todo:todoType}) => {
  const marginLeft = todo.indentation !== undefined ? `${todo.indentation * 40}px` : '0';
  const todoStyle = {
    textDecoration: todo.isCompleted === true ? "line-through" : "none",
    opacity: todo.isCompleted === true ?0.5 :1,
    marginLeft: marginLeft,
    display:todo.hidden === true ? "none" : "flex",
  };

  let todoClassName:string = "w-full flex items-center justify-between px-10 rounded-2xl py-1 relative group ";

  if(todo.indentation)
  {
    todoClassName += todo.indentation >= 1 ? "todo-item" : "";
    todoClassName += todo.indentation >= 2 ? " nth2" : "";
  }
  
  // console.log(todo.hidden);
  return (
    <div className={todoClassName} style={todoStyle}>
        <HideTodoChild todo={todo} />
        <ChangeTodo todo={todo} />
        {/* <span className="text-white">HC: {todo.hiddenchild ? "true" : "false"}</span> */}
        {/* <span>Order: {todo.order}</span>
        <span>Indentation: {todo.indentation}</span>  */}
        <EditTodoBase todo={todo} />
        <div className="flex items-center gap-5 childclass transition-all opacity-0 group-hover:opacity-100">
          <DeleteTodo todo={todo}/>
        </div>
    </div>
  );
};

export default Todo;