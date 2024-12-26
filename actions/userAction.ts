"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}

export async function createUser(formData: FormData) {
    await prisma.user.create({
        data: {
            email: formData.get('email') as string,
            name: formData.get('name') as string,
        }
    })
    revalidatePath('/users'); // Refresh halaman setelah create
}

export async function updateUser(formData: FormData) {
    await prisma.user.update({
        where: {
            id: Number(formData.get('id')),
        },
        data: {
            email: formData.get('email') as string,
            name: formData.get('name') as string,
        }
    })
    // revalidatePath('/users'); // Refresh halaman setelah create
    redirect('/users');
}

export async function deleteUser(formData: FormData) {
    await prisma.user.delete({
        where: {
            id: Number(formData.get('id')),
        }
    })
    revalidatePath('/users'); // Refresh halaman setelah create
}