"use client"
import ActionsTodoMore from "./ActionsTodoMore";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { todoType } from "@/types/todoType";
import { AiFillEdit } from "react-icons/ai";

const ActionsTodo = ({todo}: {todo:todoType}) => {
  return (
   <Form action={async () => { await ActionsTodoMore(); }}>
    <Input
      type="hidden"
      name="inputId"
      value={todo.id}
    />
    <Button
      deleted
      text={<AiFillEdit/>}
      type="submit"
    />
   </Form>
  )
}

export default ActionsTodo