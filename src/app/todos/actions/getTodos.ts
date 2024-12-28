"use server";

import { createClient } from '@/utils/supabase/server';
import { ISearchParams, ITodo } from '@/types/todo';
import { cookies } from 'next/headers';
import { Priority, SortBy } from '@/constants/todo';

export async function getTodos(searchParams: ISearchParams): Promise<{ data: ITodo[] }> {
    const cookieStore = await cookies();
    const db = createClient(cookieStore);

    let query = db.from('todos').select().order(getSortBy(searchParams.sortBy), { ascending: true });

    const priority = getPriority(searchParams.priority);

    if (priority !== Priority.ANY) {
        query = query.eq('priority', priority);
    }

    if (searchParams.completed !== undefined && searchParams.completed !== 'All') {
        query = query.eq('completed', searchParams.completed === 'Completed');
    }

    const dueDate = getDueDate(searchParams.due_date);
    if (dueDate) {
        const formattedDate = formatDate(dueDate);
        query = query.eq('due_date', formattedDate);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
    }

    return { data: data as ITodo[] };
}

const getSortBy = (sortBy: SortBy): SortBy => {
    switch (sortBy) {
        case SortBy.PRIORITY:
            return SortBy.PRIORITY;
        case SortBy.DUE_DATE:
            return SortBy.DUE_DATE;
        default:
            return SortBy.TITLE;
    }
};

const getPriority = (priority: Priority): Priority => {
    switch (priority) {
        case Priority.P1:
            return Priority.P1;
        case Priority.P2:
            return Priority.P2;
        case Priority.P3:
            return Priority.P3;
        case Priority.P4:
            return Priority.P4;
        default:
            return Priority.ANY;
    }
};

const getDueDate = (dueDate: string): Date | null => {
    return dueDate && /^\d{4}-\d{2}-\d{2}$/.test(dueDate)
        ? new Date(dueDate)
        : null;
};

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
