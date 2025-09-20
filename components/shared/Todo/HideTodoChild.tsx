"use client"
import { HideTodoChildLines } from "@/app/actions/todoActions";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { todoType } from "@/types/todoType";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";



const HideTodoChild = ({ todo }: {todo:todoType}) => {
    
    const hideTodoChildAction =  () => {
        if (todo.id && typeof todo.indentation === 'number' && typeof todo.order === 'number') {
            HideTodoChildLines(todo.indentation, todo.order); 
        } 
    };
    
  return (
    <Button 
        smallButton 
        abs 
        text={todo.hiddenchild?<MdOutlineArrowRight />:<MdOutlineArrowDropDown />} 
        onClick={(hideTodoChildAction)}
        type="submit"
    />
  )
}

export default HideTodoChild