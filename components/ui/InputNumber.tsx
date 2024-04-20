interface inputNumberProps {
    name : string;
    type : string;
    placeholder? : string;
    value? : number;
  }
  
  const InputNumber = ({name, type, placeholder, value}:inputNumberProps) => {
    return (
      <>
        <input className="w-full p-2 border border-gray-200" 
          name={name} 
          type={type} 
          placeholder={placeholder} 
          value={value}
          />
      </>
    )
  }
  
  export default InputNumber