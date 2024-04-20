"use client"
import clsx from "clsx";
import { ReactNode } from "react";
import { FiMenu } from "react-icons/fi";

interface buttonProps{
  type? : "button" | "submit" | "reset";
  text : string | ReactNode;
  onClick?: () => void;
  actionButton? : boolean;
  checked? : boolean;
  abs?: boolean;
  deleted?: boolean;
}


const Button = ({type,text,onClick, actionButton,checked,abs,deleted}:buttonProps) => {
  return(
    <>
      <button 
      onClick={onClick}
      type={type}
      className={clsx(
        actionButton && 'rounded-full p-2 transition-all',
        actionButton && !abs && 'text-white',
        actionButton && !checked && !deleted && 'bg-transparent border-black border-2',
        !actionButton && 'bg-orange-700 px-2 text-white border-2 border-orange-200',
        abs && 'bg-transparent px-2 text-black border-2 border-transparent',
        deleted && 'bg-red-500', // Condition pour ajouter une classe en fonction de checked
        checked && 'bg-green-500', // Condition pour ajouter une classe en fonction de checked
        'hover:bg-blue-900 hover:border-blue-900 hover:text-white' // Styles pour le survol ajoutés indépendamment des conditions
      )}
      >{text}</button>
    </>
  )
}

<FiMenu />
export default Button