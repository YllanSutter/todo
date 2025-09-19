import { changeStatus } from "@/app/actions/todoActions";
import Form from "../ui/Form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { AiOutlineCheck  } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { todoType } from "@/types/todoType";

const ChangeTodo = ({todo} : {todo:todoType}) => {
 
  return (
    <Form action={changeStatus} 
    className = "">
        <Input
            name = "inputId"
            value = {todo.id}
            type = "hidden"
        />
        <Button actionButton checked = {todo.isCompleted || false} type="submit" text={todo.isCompleted ? <RxCross1 /> : <AiOutlineCheck />}/>
    </Form>
  )
}

export default ChangeTodo