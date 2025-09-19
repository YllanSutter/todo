import { MutableRefObject } from "react";

interface inputProps {
  name : string;
  type : string;
  placeholder? : string;
  value? : string;
}

const InputDaisy = ({name, type, placeholder, value}:inputProps) => {
  return (
    <>
    <label className="input bg-transparent">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
        <input className="w-full p-2 border-b border-[#ffffff10] text-white bg-transparent"
          name={name} 
          type={type} 
          placeholder={placeholder} 
          value={value}
          />
      </label>
    </>
  )
}

export default InputDaisy