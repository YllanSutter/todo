"use client"
import { HideTodoChildLines } from "@/app/actions/todoActions";
import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import { todoType } from "@/types/todoType";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";



const HideTodoChild = ({ todo }: {todo:todoType}) => {
    
    const hideTodoChildAction =  () => {
        if (todo.id && typeof todo.indentation === 'number' && typeof todo.order === 'number') {
            HideTodoChildLines(todo.indentation, todo.order); 
        } 
    };
    
  return (
    <Button 
        actionButton 
        abs 
        text={<FaAngleDown/>} 
        onClick={(hideTodoChildAction)}
        type="submit"
    />
  )
}

export default HideTodoChild