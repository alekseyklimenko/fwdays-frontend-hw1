"use server";

import { Priority } from '@/constants/todo';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function patchTodo(formData: FormData) {
    const cookieStore = await cookies();
    const db = createClient(cookieStore);

    const id = +formData.get('id');
    if (!id) {
        throw new Error('Todo ID is missing');
    }

    const todoData = {
        title: formData.get('title')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        due_date: formData.get('due_date') ? new Date((formData.get('due_date') as object).toString()) : null,
        priority: formData.get('priority')?.toString() || Priority.P4,
        completed: Boolean(formData.get('completed')),
        updated_at: new Date()
    };

    const { error } = await db.from('todos').update(todoData).eq('id', id);

    if (error) {
        throw new Error(`Failed to update todo: ${error.message}`);
    }

    revalidatePath('/todos');
    redirect('/todos');
}
