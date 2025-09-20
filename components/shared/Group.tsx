import { groupType } from '@/types/groupType';
import SelectGroup from './Group/SelectGroup';
import DeleteGroup from './Group/DeleteGroup';

const Group = ({ group }: {group:groupType}) => {
  const groupStyle = {
    opacity: group.selected === true ? "1" : "0.5"
  };

  let groupClassName: string = 'flex items-center justify-between p-4 items-center text-center bg-slate-900 hover:bg-slate-800 rounded-md ' + (group.selected ? 'border-[1px] border-[#ffffff20]' : '');
  
  return (
    <div  className={groupClassName} style={groupStyle}>
        <SelectGroup  group={group}/>
        <DeleteGroup  group={group}/>
    </div>
  );
};

export default Group;