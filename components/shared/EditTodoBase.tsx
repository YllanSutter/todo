"use client"
import { edit } from "@/app/actions/todoActions";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";
import { todoType } from "@/types/todoType";
import { BiEdit } from "react-icons/bi";


const EditTodoBase = ({ todo } : {todo:todoType}) => {
    const [editTodoBase, setEditTodoBase] = useState(false);

    const handleEdit = () => {
        // if(todo.isCompleted === true){
        //     return;
        // } // si on veut empecher l'edit quand c'est coché
        setEditTodoBase(!editTodoBase);
    };

    const handleSubmit =  () =>  {
        setEditTodoBase(false);
    }

    return (
   
        <div className="flex gap-5 items-center">
            <Button
                onClick={(handleEdit)}
                text={<BiEdit />}
                actionButton
            />
                <Form action={edit} onSubmit={handleSubmit}
                >
                <Input
                    name="inputId"
                    value={todo.id}
                    type="hidden"
                />
                <div className="flex justify-center">
                    <Input
                        type = "text"
                        name = "newTitle"
                        placeholder="Edit Todo ..."
                        value = {todo.title}
                    />
                    <Button type="submit" text="Save"/>
                </div>
                </Form>
        </div>
    )
}

export default EditTodoBase