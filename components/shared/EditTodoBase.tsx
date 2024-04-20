"use client"
import { deleteTodoLineSuppr, editBase,createAdd,IndentationBase } from "@/app/actions/todoActions";
import { useState,useEffect,useRef } from "react";
import { todoType } from "@/types/todoType";


const EditTodo = ({ todo }: { todo: todoType }) => {
    const [editTodo, setEditTodo] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title); // État local pour la valeur du champ de texte
    const [originalTitle, setOriginalTitle] = useState(todo.title); // Stocke la valeur originale du titre
    const [deleteInProgress, setDeleteInProgress] = useState(false); // État local pour suivre l'état de la suppression
    const inputRef = useRef(null); // Référence à l'élément input

    // Utilisez useEffect pour mettre à jour newTitle lorsque todo.title change
    useEffect(() => {
        setNewTitle(todo.title);
        setOriginalTitle(todo.title); // Met à jour la valeur originale du titre
    }, [todo.title]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value); // Met à jour l'état local avec la nouvelle valeur du champ de texte
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const inputValue = (e.target as HTMLInputElement).value;

        // Vérifie si la touche appuyée est la touche "Delete" ou "Backspace", si le champ est vide et si la suppression n'est pas en cours
        if ((e.keyCode === 46 || e.keyCode === 8) && inputValue === "" && !deleteInProgress) {
            if (todo.id) {
                deleteTodoLineSuppr(todo.id);
                setDeleteInProgress(true); // Met à jour l'état de la suppression
            }
        }
        // Vérifie si la touche Entré est appuyé
        else if(e.keyCode === 13)
        {
            if (todo.id && typeof todo.indentation === 'number' && typeof todo.order === 'number') {
             createAdd(todo.indentation,todo.order); 
            } 
        }
        // Vérifie si la touche Tab est appuyée et que la touche Shift est également enfoncée
        else if (e.keyCode === 9 && e.shiftKey) {
            e.preventDefault(); // Empêche le comportement par défaut de la touche Tab
            if (todo.id && typeof todo.indentation === 'number') {
                IndentationBase(todo.id, todo.indentation, "indentless");
            }
        }
        //verifie si seulement la touche tab est appuyée
        else if(e.keyCode === 9)
        {
            e.preventDefault();
            if(todo.id && typeof todo.indentation == 'number')
            {
                IndentationBase(todo.id,todo.indentation,"indentplus");
            }
        }
    }

    const handleKeyUp = () => {
        setDeleteInProgress(false); // Réinitialise l'état de la suppression lorsque la touche est relâchée
    };

    const handleSubmit = async () => {
        if (todo.id && newTitle !== undefined && newTitle !== null && newTitle !== originalTitle) {
            await editBase(todo.id, newTitle);
            setEditTodo(false);
        } else {
            console.error("Todo ID is null or undefined, or title is not changed.");
        }
    };

    const handleBlur = () => {
        // Déclenche la soumission du formulaire si le titre a changé
        if (newTitle !== originalTitle) {
            handleSubmit();
        }
    };

    return (
        <div className="flex gap-5 items-center">
            <div className="flex justify-center">
                <input
                    ref={inputRef}
                    className="w-full p-2 border border-gray-200"
                    type="text"
                    value={newTitle || ''}
                    onChange={handleTitleChange}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onBlur={handleBlur} // Déclenche la soumission lorsque l'utilisateur quitte le champ de texte
                />
            </div>
        </div>
    );
};

export default EditTodo;