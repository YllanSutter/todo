import Form from "../../ui/Form";
import InputDaisy from "../../ui/InputDaisy";
import Button from "../../ui/Button";
import { createGroup } from "@/app/actions/todoActions";

const createGroupTodo = () => {
  return (
    <Form action={createGroup} className="w-full">
        <div className="flex w-full gap-2">
            <InputDaisy 
            name="input"
            type="text"
            placeholder="Add Group..."
            />
            <Button 
            type="submit"
            text = "ajouter"/>
        </div>
    </Form>
  )
}

export default createGroupTodo;