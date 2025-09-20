"use client"
import { deleteGroup } from "@/app/actions/groupActions";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { groupType } from "@/types/groupType";
import { BsFillTrashFill } from "react-icons/bs";

const deleteTodo = ({group}: {group:groupType}) => {
  return (
   <Form action={deleteGroup}>
    <Input
      type="hidden"
      name="inputId"
      value={group.id}
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