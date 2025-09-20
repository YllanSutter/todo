import AddTodo from "@/components/shared/Todo/AddTodo";
import { prisma } from "@/utils/prisma";
import Todo from "@/components/shared/Todo";
import CreateGroup from "@/components/shared/Group/CreateGroup";
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
    <div className="w-full py-20 flex flex-col items-center overflow-hidden h-svh">
      
        <span className="text-1xl font-extrabold uppercase text-white">Next.js 14</span>
        <h1 className="text-3xl font-extrabold uppercase mb-20 text-white">To-do-app <span className="text-1xl font-extrabold uppercase text-orange-500 ml-2">{selectedGroup?selectedGroup.name:"Server Actions"}</span></h1>
        
        <div className="flex gap-10 items-start">
          <div className="GroupsList grid gap-4 items-start">
            <CreateGroup/>
            {groups.map((group,id) =>(
              <div className="card transition-all duration-500 text-neutral-content w-96" key={id}>
                
                  <Group group={group}/>
              </div>
            ))}
          </div>
          <div className="flex justify-center flex-col w-full card bg-slate-900 p-10">
              <AddTodo/>
              <div className="flex flex-col barreLeft items-center justify-center mt-10 w-full">
                {data.map((todo, id) => (
                  <div className="w-full" key={id}>
                    <Todo todo={todo} />
                  </div>
                ))}
              </div>
          </div> 
        </div>
    </div>
  )
}

export default Home;