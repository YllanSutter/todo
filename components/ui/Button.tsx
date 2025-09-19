"use client"
import clsx from "clsx";
import { ReactNode } from "react";
import { FiMenu } from "react-icons/fi";

interface buttonProps{
  type? : "button" | "submit" | "reset";
  text : string | ReactNode;
  onClick?: () => void;
  actionButton? : boolean;
  smallButton? : boolean;
  checked? : boolean;
  abs?: boolean;
  deleted?: boolean;
}


const Button = ({type,text,onClick, actionButton,smallButton,checked,abs,deleted}:buttonProps) => {
  // Warning si incohérence
  if (checked && deleted) {
    console.warn('Le bouton ne peut pas être checked ET deleted en même temps.');
  }

  // Détermination des classes DaisyUI
  let btnClass = 'btn';
  if (deleted) btnClass += ' btn-error';
  else if (checked) btnClass += ' btn-success btn-xs';
  else if (actionButton) btnClass += ' btn-outline btn-xs btn-accent';
  else if (smallButton) btnClass += ' btn-ghost btn-xs';
  else btnClass += ' btn-soft btn-accent';
  if (abs) btnClass += ' absolute left-1 top-2';

  return (
    <button
      onClick={onClick}
      type={type}
      className={btnClass}
      aria-label={typeof text === 'string' ? text : 'Bouton'}
      role="button"
      tabIndex={0}
      autoFocus={abs ? true : undefined}
    >
      {text}
    </button>
  );
}

<FiMenu />
export default Button