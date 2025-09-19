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
    const [value, setValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Utilisez useEffect pour ajuster la taille du textarea lors de l'affichage
    useEffect(() => {
        adjustTextAreaHeight();
    }, []);

    // Utilisez useEffect pour mettre à jour newTitle lorsque todo.title change
    useEffect(() => {
        setNewTitle(todo.title);
        setOriginalTitle(todo.title); // Met à jour la valeur originale du titre
        
    }, [todo.title]);

     // Fonction pour ajuster la taille du textarea
     const adjustTextAreaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + "px";
        }
    };



    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewTitle(e.target.value); // Met à jour l'état local avec la nouvelle valeur du champ de texte
        
        const val = e.target?.value; //on change la valeur pour le textarea
        setValue(val);
        adjustTextAreaHeight();
    };

    const handleKeyDown = async(e: React.KeyboardEvent) => {
        const inputValue = (e.target as HTMLTextAreaElement).value;

        // Vérifie si la touche appuyée est la touche "Delete" ou "Backspace", si le champ est vide et si la suppression n'est pas en cours
        if ((e.keyCode === 46 || e.keyCode === 8) && inputValue === "" && !deleteInProgress) {
            if (todo.id) {
                deleteTodoLineSuppr(todo.id);
                setDeleteInProgress(true); // Met à jour l'état de la suppression
                if(todo.title == "")
                {
                    focusAdjacentElement(todo, "previous");
                }
            }
        }
        // Vérifie si la touche Entré est appuyé
        else if (e.keyCode === 13) {
            e.preventDefault(); // Empêche le comportement par défaut de la touche "Enter"
    
            // Crée une nouvelle ligne avec un ordre incrémenté
            if (todo.id && typeof todo.indentation === 'number' && typeof todo.order === 'number') {
                await createAdd(todo.indentation, todo.order);
                // Change le focus vers la nouvelle ligne créée
                focusAdjacentElement(todo, "next");
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

    function focusAdjacentElement(todo: todoType, direction: "next" | "previous") {
        let newOrder:number;
        // Sélectionner l'élément suivant ou précédent en fonction de la direction
        if(todo.order)
        {
            newOrder = direction === "next" ? todo.order + 1 : todo.order - 1;
        }
        else if(direction === "next")
        {
            newOrder =  1;
        }
        // Ajouter un délai de 100 millisecondes avant de sélectionner l'élément suivant
        setTimeout(() => {
            // Sélection de l'élément avec l'attribut data-order après le délai
            const nextInput = document.querySelector(`textarea[data-order="${newOrder}"]`) as HTMLTextAreaElement | null;
            if (nextInput) {
                nextInput.focus(); // Mettre le focus sur l'élément
            }
        }, 150);
    }



    return (
        <div className="flex gap-2 items-center w-full">
            <div className="flex justify-center w-full">
                <textarea
                    rows={1}
                    ref={textAreaRef}
                    className="w-full px-4  focus:border-0 focus:outline-none bg-transparent text-white"
                    value={newTitle || ''}
                    onChange={handleTitleChange}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onBlur={handleBlur} // Déclenche la soumission lorsque l'utilisateur quitte le champ de texte
                    data-order={todo.order}
                />
            </div>
        </div>
    );
};

export default EditTodo;