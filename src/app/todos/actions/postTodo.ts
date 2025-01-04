"use server";

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Priority } from '@/constants/todo';

export default async function postTodo(formData: FormData) {
    const cookieStore = await cookies();
    const db = createClient(cookieStore);

    const { data: userResp, error: userErr } = await db.auth.getUser();

    if (userErr || !userResp?.user) {
        redirect('/login');
        return;
    }

    const todoData = {
        title: formData.get('title')?.toString() || '',
        due_date: formData.get('due_date') ? new Date((formData.get('due_date') as object).toString()) : null,
        description: formData.get('description')?.toString() || '',
        priority: formData.get('priority')?.toString() || Priority.P4,
        completed: Boolean(formData.get('completed')),
        user_id: userResp?.user?.id
    };

    const { error } = await db.from('todos').insert([todoData]);

    if (error) {
        throw new Error(`Failed to insert todo: ${error.message}`);
    }

    revalidatePath('/todos');
    redirect('/todos');
}
