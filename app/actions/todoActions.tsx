"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

import { todoType } from "@/types/todoType";

export async function create(formData: FormData) {
    const input = formData.get("input") as string;

    // Récupérer l'ID du groupe sélectionné
    const selectedGroup = await prisma.group.findFirst({
        where: {
            selected: true
        }
    });

    // Récupérer la valeur maximale de l'ordre dans les todos du groupe sélectionné
    const maxOrderTodo = await prisma.todo.findFirst({
        where: {
            groupId: selectedGroup?.id,
        },
        orderBy: {
            order: 'desc',
        },
    });

    const newOrder = maxOrderTodo ? maxOrderTodo.order + 1 : 0;
    const newIndentation = maxOrderTodo ? maxOrderTodo.indentation : 0;

    await prisma.todo.create({
        data: {
            title: input,
            groupId: selectedGroup ? selectedGroup.id : null,
            order: newOrder,
            indentation: newIndentation,
        },
    });

    revalidatePath("/");
}

export async function createGroup(formData:FormData) {
    const input = formData.get("input") as string;

    await prisma.group.create({
        data:{
            name: input,
        },
    });
    revalidatePath("/")
}

export async function createAdd(Currentindentation: number, Currentorder: number) {
    const baseTodos = await prisma.todo.findMany();
    let newOrder: number;

    // Récupérer l'ID du groupe sélectionné
    const selectedGroup = await prisma.group.findFirst({
        where: {
            selected: true
        }
    });

    // Si aucun groupe n'est sélectionné, faites quelque chose, comme générer une erreur ou ne pas attribuer d'ID de groupe à la tâche

    if (!selectedGroup) {
        // Gérer le cas où aucun groupe n'est sélectionné
        console.error("Aucun groupe sélectionné.");
        return;
    }
    else
    {
        console.log("tset")
    }

    const selectedGroupId = selectedGroup.id;

    // Créer la nouvelle tâche avec l'ordre incrémenté
    newOrder = Currentorder + 1;

    await prisma.todo.create({
        data: {
            title: "",
            indentation: Currentindentation,
            order: newOrder,
            groupId: selectedGroupId // Assigner l'ID du groupe sélectionné à la tâche
        },
    });

    // Mettre à jour les ordres des tâches suivantes si nécessaire
    const todosToUpdate = baseTodos.filter((todo: todoType) => typeof todo.order === "number" && todo.order >= newOrder);

    if (todosToUpdate.length > 0) {
        // Incrémenter les ordres des tâches suivantes
        await prisma.todo.updateMany({
            where: {
                id: {
                    in: todosToUpdate.map((todo: todoType) => todo.id)
                }
            },
            data: {
                order: {
                    increment: 1
                }
            }
        });
    }

    revalidatePath("/");
}


export async function changeStatus(formData : FormData){
    const inputId = formData.get("inputId") as string
    const todo = await prisma.todo.findUnique({
        where:{
            id: inputId,
        },
    });

    if(!todo)
    {
        return;
    }

    const updatedStatus = !todo?.isCompleted;

    await prisma.todo.update({
        where: {
          id: inputId,
        },
        data: {
          isCompleted: updatedStatus,
        },
      });
    
      revalidatePath("/");
    
      return updatedStatus;
}

export async function edit(formData:FormData) {
    const input = formData.get("newTitle") as string
    const inputId = formData.get("inputId") as string

    await prisma.todo.update({
        where:{
            id: inputId
        },
        data:{
            title:input
        }
    });
    
    revalidatePath("/");
}

export async function editBase(todoId: string, newTitle: string) {
    await prisma.todo.update({
        where: {
            id: todoId
        },
        data: {
            title: newTitle
        }
    });

    revalidatePath("/");
}

export async function deleteTodoLine(FormData:FormData) {
    const inputId = FormData.get("inputId") as string

    await prisma.todo.delete(
    {
        where: {
            id : inputId,
        },
    });
    revalidatePath("/");
}

export async function deleteTodoLineSuppr(todoId: string) {
    await prisma.todo.delete({
        where: {
            id: todoId,
        },
    });
    revalidatePath("/");
}

export async function IndentationBase(todoId: string,todoIndentation:number,todoOrder:string) {

    let newIndentation: number;
    const currentIndentation = todoIndentation || 0; // Valeur actuelle de l'indentation
    if(todoOrder === "indentplus")
    {
        newIndentation = currentIndentation + 1; // Incrément de 1
    }
    else
    {
        if(currentIndentation>0)
        {

            newIndentation = currentIndentation - 1; // On enleve 1
        }
        else
        {
            newIndentation = 0;
        }
    }

    // Mettre à jour la base de données avec la nouvelle valeur d'indentation
    await prisma.todo.update({
        where: {
            id: todoId
        },
        data: {
            indentation: newIndentation
        }
    });

    revalidatePath("/");
}


export async function HideTodoChildLines(Currentindentation: number, Currentorder: number) {
    let baseTodos = await prisma.todo.findMany();

    // Trier les tâches par ordre croissant
    baseTodos = baseTodos.sort((a, b) => a.order - b.order);

    // Trouver la tâche correspondant à l'ordre actuel
    const selectedTodo = baseTodos.find(todo => todo.order === Currentorder);

    // Si aucune tâche ne correspond à l'ordre actuel, ne rien faire
    if (!selectedTodo) {
        return;
    }

    // Obtenir l'indice de la tâche sélectionnée dans la liste des tâches triées
    const selectedIndex = baseTodos.findIndex(todo => todo.order === Currentorder);
    const todoBase = baseTodos[selectedIndex];
    await prisma.todo.update({
        where: {
            id: todoBase.id
        },
        data: {
            hiddenchild: !todoBase.hiddenchild
        } 
    });

    // Parcourir toutes les tâches pour mettre à jour celles qui doivent l'être, à partir de l'indice de la tâche sélectionnée
    for (let i = selectedIndex + 1; i < baseTodos.length; i++) {
        const todo = baseTodos[i];

        //console.log(todo.order+ "Base : "+todo.indentation+" / Current : "+Currentindentation);
        // Si l'indentation de la tâche est inférieure ou égale à l'indentation de la tâche sélectionnée, arrêter la mise à jour
        if (todo.indentation <= Currentindentation) {
            break;
        }

        // Mettre à jour la tâche pour inverser l'état de hidden
        await prisma.todo.update({
            where: {
                id: todo.id
            },
            data: {
                hidden: !todo.hidden
            }
        });
        
    }

    revalidatePath("/");
}


export async function selectGroupTo(groupId: string, selectedBase: boolean) 
{
    let baseGroups = await prisma.group.findMany();

    if (baseGroups.length > 0) {
        // Incrémenter les ordres des tâches suivantes
        await prisma.group.updateMany({
            where: {
                id: {
                    in: baseGroups.map(group => group.id)
                }
            },
            data: {
                selected: false
            }
        });
    }

    await prisma.group.update({
        where: {
            id: groupId
        },
        data: {
            selected: true
        }
    });

    revalidatePath("/");
}