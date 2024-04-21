"use client"

import { useRef,ReactNode } from "react"
interface formProps {
  children : ReactNode;
  action : (formData: FormData) => Promise<void |boolean>;
  className?: string;
  onSubmit?: () => void;
}

const Form = ({children, action, className, onSubmit}:formProps) => {
  const ref = useRef<HTMLFormElement>(null) //permet de faire en sorte que le form se reset quand on le lance
  return  <form 
  className={className} 
  onSubmit={onSubmit} 
  ref={ref} 
  action={async (formData) => {
      await action(formData);
      ref.current?.reset();
    }}
  >{children}</form>
  
}

export default Form