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
}


const Button = ({type,text,onClick, actionButton,checked}:buttonProps) => {
  return(
    <>
      <button 
      onClick={onClick}
      type={type}
      className={clsx(
        actionButton && 'rounded-full p-2 text-white transition-all',
        actionButton && !checked && 'bg-red-700',
        !actionButton && 'bg-orange-700 px-2 text-white border-2 border-orange-200',
        checked && 'bg-green-500', // Condition pour ajouter une classe en fonction de checked
        'hover:bg-blue-900 hover:border-orange-300' // Styles pour le survol ajoutés indépendamment des conditions
      )}
      >{text}</button>
    </>
  )
}

<FiMenu />
export default Button