"use client"
import { selectGroupTo } from "@/app/actions/todoActions";
import { useState } from "react";
import { groupType } from "@/types/groupType";
import { BiEdit } from "react-icons/bi";


const SelectGroup = ({ group }: { group: groupType }) => {
    const [groupId, setGroupId] = useState(group.id);
    const [selectedBase, setSelectedBase] = useState(group.selected);

    const handleEditClick = () => {
        setSelectedBase(!selectedBase);
        selectGroupTo(groupId, !selectedBase); // Appeler la fonction de sélection du groupe avec les nouvelles valeurs
    };

    return (
        <div>
            <button onClick={handleEditClick} className="flex items-center w-full gap-3">
                <BiEdit />
                 <span>{group.name}</span>
            </button>
        </div>
    );
};

export default SelectGroup;