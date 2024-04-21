import { MutableRefObject } from "react";

interface inputProps {
  name : string;
  type : string;
  placeholder? : string;
  value? : string;
}

const Input = ({name, type, placeholder, value}:inputProps) => {
  return (
    <>
      <input className="w-full p-2 border-b-2 border-white-100 text-white bg-transparent"
        name={name} 
        type={type} 
        placeholder={placeholder} 
        value={value}
        />
    </>
  )
}

export default Input