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
      <input className="input w-full p-2 border-b border-[#ffffff10] text-white bg-transparent"
        name={name} 
        type={type} 
        placeholder={placeholder} 
        value={value}
        />
    </>
  )
}

export default Input