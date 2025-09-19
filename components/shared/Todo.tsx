import ChangeTodo from "./ChangeTodo";
import { todoType } from "@/types/todoType";
import EditTodoBase from "./EditTodoBase";
import DeleteTodo from "./DeleteTodo";
import ActionsTodo from "./ActionsTodo";
import HideTodoChild from "./HideTodoChild";
import { useEffect, useRef } from 'react';
import { before } from "node:test";
import { prisma } from "@/utils/prisma";

const Todo = async({ todo }: { todo: todoType }) => {

  const selectedGroup = await prisma.group.findFirst({
      where: {
          selected: true
      }
  });

  let isSelectedGroupTodo:boolean;

  if(selectedGroup)
  {
    // Vérifier si le todo appartient au groupe sélectionné
    isSelectedGroupTodo = todo.groupId === selectedGroup.id;
    
    // Si le todo n'appartient pas au groupe sélectionné, ne pas l'afficher
    if (!isSelectedGroupTodo) {
      return null;
    }
  }
  else
  {
    return null;
  }


  const marginLeft = todo.indentation !== undefined ? `${todo.indentation * 40}px` : '0';
  const todoStyle = {
    textDecoration: todo.isCompleted === true ? "line-through" : "none",
    opacity: todo.isCompleted === true ? 0.5 : 1,
    marginLeft: marginLeft,
    display: todo.hidden === true ? "none" : "flex",
  };

  let todoClassName: string = "w-full flex items-center justify-between px-10 py-1 relative group border-b border-slate-800 ";

  if (todo.indentation) {
    todoClassName += todo.indentation >= 1 ? "todo-item" : "";
    todoClassName += todo.indentation >= 2 ? " nth2" : "";
  }

  return (
    <div className={todoClassName} style={todoStyle}>
      <HideTodoChild todo={todo} />
      <ChangeTodo todo={todo} />
      <EditTodoBase todo={todo} />
      <div className="flex items-center gap-2 childclass transition-all opacity-0 group-hover:opacity-100">
        <ActionsTodo todo={todo} />
        <DeleteTodo todo={todo} />
      </div>
    </div>
  );
};

export default Todo;