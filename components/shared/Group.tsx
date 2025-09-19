import { groupType } from '@/types/groupType';
import SelectGroup from './SelectGroup';

const Group = ({ group }: {group:groupType}) => {
  const groupStyle = {
    opacity: group.selected === true ? "1" : "0.5"
  };

  let groupClassName: string = "card-body p-4 items-center text-center";
  
  return (
    <div  className={groupClassName} style={groupStyle}>
        <SelectGroup  group={group}/>
        {/* <span>ID: {group.id}</span> <br/>
        <span>Selected: {group.selected?"true":"false"}</span>  */}
    </div>
  );
};

export default Group;