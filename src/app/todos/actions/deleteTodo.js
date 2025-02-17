"use server";

import { createClient } from 'utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function deleteTodo(formData) {
    const cookieStore = await cookies();
    const db = createClient(cookieStore);

    const { data: userResp, error: userErr } = await db.auth.getUser();

    if (userErr || !userResp?.user) {
        redirect('/login');
        return;
    }

    const todoId = formData.get('id') ? Number(formData.get('id')) : 0;

    if (!todoId) {
        console.warn('Todo ID is missing.');
        return;
    }

    const { error } = await db.from('todos').delete().eq('id', todoId);

    if (error) {
        throw new Error(`Failed to delete todo: ${error.message}`);
    }

    revalidatePath('/todos');
    redirect('/todos');
}
