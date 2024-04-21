import AddTodo from "@/components/shared/AddTodo";
import { prisma } from "@/utils/prisma";
import Todo from "@/components/shared/Todo";
import CreateGroup from "@/components/shared/CreateGroup";
import Group from "@/components/shared/Group";

async function getData() {
  const data = await prisma.todo.findMany({
    select:{
      title:true,
      id:true,
      isCompleted:true,
      indentation:true,
      order:true,
      hidden:true,
      hiddenchild:true,
      groupId:true,
    },
    orderBy:{
      order: "asc"
    },
  });
  return data;
}

async function getGroups() {
  const groups = await prisma.group.findMany({
    select:{
      name:true,
      id:true,
      selected:true
    },
  });
  return groups;
}

const Home = async () => {
  const data = await getData();
  const groups = await getGroups();

  // Récupérer l'ID du groupe sélectionné
  const selectedGroup = await prisma.group.findFirst({
      where: {
          selected: true
      }
  });

  return (
    <div className="w-full py-20 flex justify-center flex-col items-center  overflow-hidden">
      
        <span className="text-1xl font-extrabold uppercase text-white">Next.js 14</span>
        <h1 className="text-3xl font-extrabold uppercase mb-5 text-white">To-do-app <span className="text-1xl font-extrabold uppercase text-orange-500 ml-2">{selectedGroup?selectedGroup.name:"Server Actions"}</span></h1>
        
        <div className="flex">
          <div className="GroupsList">
            <CreateGroup/>
            {groups.map((group,id) =>(
              <div className="w-full" key={id}>
                <Group group={group}/>
              </div>
            ))}
          </div>
          <div className="flex justify-center flex-col w-[1000Px]">
              <AddTodo/>
              <div className="flex flex-col barreLeft items-center justify-center mt-10 w-full">
                {data.map((todo,id) =>(
                  <div className="w-full" key={id}>
                    <Todo todo={todo}/>
                  </div>
                ))}
              </div>
          </div> 
        </div>
    </div>
  )
}

export default Home;