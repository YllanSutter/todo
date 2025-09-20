"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

export async function deleteGroup(FormData:FormData) {
    const inputId = FormData.get("inputId") as string

    await prisma.group.delete(
    {
        where: {
            id : inputId,
        },
    });
    revalidatePath("/");
}