import { groupType } from '@/types/groupType';
import SelectGroup from './SelectGroup';

const Group = ({ group }: {group:groupType}) => {
  const groupStyle = {
    opacity: group.selected === true ? "1" : "0.5",
    padding: group.selected === true ? "0" : "0 20px"
  };

  let groupClassName: string = "text-white m-2 flex gap-2 items-center :hover:px-0";
  
  return (
    <div  className={groupClassName} style={groupStyle}>
        <SelectGroup  group={group}/>
        {/* <span>ID: {group.id}</span> <br/>
        <span>Selected: {group.selected?"true":"false"}</span>  */}
    </div>
  );
};

export default Group;