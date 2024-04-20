"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/utils/prisma"

export async function create(formData:FormData) {
    const input = formData.get("input") as string;

    // if(!input.trim()){ // a mettre si on veut pas avoir la possibilité de créer des lignes vides
    //     return;
    // } 

    await prisma.todo.create({
        data:{
            title: input,
        },
    });
    revalidatePath("/")
}

export async function createAdd() {
    await prisma.todo.create(
    {
        data:{
            title: "",
        },
    });
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