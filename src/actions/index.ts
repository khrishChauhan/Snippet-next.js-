"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveSnippet = async (id: number, code: string) => {
    await prisma.snippet.update({
        where: { id },
        data: { code }      
    });

    revalidatePath(`/snippet/${id}`);

    redirect(`/snippet/${id}`);

};

export const deleteSnippet = async (id: number) => {
    await prisma.snippet.delete({
        where: { id }
    });
    revalidatePath(`/`);
    redirect(`/`);
}

export async function createSnippet(formData: FormData) {
        const title = formData.get('title')
        const code = formData.get('code')

        if(!title || typeof title !== 'string' || title.length <= 4) {
            return {message: "Invalid title must be at least 5 characters long"}
        }

        if(!code || typeof code !== 'string') {
            return {message: "Invalid code"}
        }


        const snippet =  await prisma.snippet.create({
            data: {
                title,
                code
            }
        })
        
        revalidatePath(`/`);
        redirect('/');
}