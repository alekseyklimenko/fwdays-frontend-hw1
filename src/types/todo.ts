import {Priority, SortBy} from "@/constants/todo";

export interface ITodo {
    id: string;
    title: string;
    due_date: string;
    description: string;
    priority: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface ISearchParams {
    sortBy: SortBy;
    priority: Priority;
    completed: string;
    due_date: string;
}
