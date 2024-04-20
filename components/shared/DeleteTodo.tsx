"use client"
import { deleteTodoLine } from "@/app/actions/todoActions";
import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import { todoType } from "@/types/todoType";
import { BsFillTrashFill } from "react-icons/bs";

const deleteTodo = ({todo}: {todo:todoType}) => {
  return (
   <Form action={deleteTodoLine}>
    <Input
      type="hidden"
      name="inputId"
      value={todo.id}
    />
    <Button
      actionButton
      deleted
      text={<BsFillTrashFill/>}
      type="submit"
    />
   </Form>
  )
}

export default deleteTodo