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
        actionButton && ' transition-all',
        actionButton && !abs && 'text-white',
        actionButton && !checked && !deleted && 'bg-transparent border-grey border-2 p-15 p-1',
        actionButton && !checked && !deleted && !abs && 'opacity-25 text-slate-950',
        actionButton  && !deleted && !abs && 'rounded-md',
        !actionButton && 'bg-transparent px-2 text-white border-2 border-gray-200',
        abs && 'bg-transparent px-2 text-white border-2 border-transparent absolute left-1 top-2',
        deleted && 'bg-red-500 rounded-full p-2', // Condition pour ajouter une classe en fonction de checked
        checked && 'bg-green-500 p-1 text-white', // Condition pour ajouter une classe en fonction de checked
        actionButton && !abs && ' hover:text-white hover:opacity-100' // Styles pour le survol ajoutés indépendamment des conditions
      )}
      >{text}</button>
    </>
  )
}

<FiMenu />
export default Button