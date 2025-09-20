import Form from "../../ui/Form";
import InputDaisy from "../../ui/InputDaisy";
import Button from "../../ui/Button";
import { create } from "@/app/actions/todoActions";

const AddTodo = () => {
  return (
    <Form action={create} className="w-full">
        <div className="flex gap-2">
            <InputDaisy 
            name="input"
            type="text"
            placeholder="Add Todo..."
            />
            <Button 
            type="submit"
            text = "ajouter"/>
        </div>
    </Form>
  )
}

export default AddTodo