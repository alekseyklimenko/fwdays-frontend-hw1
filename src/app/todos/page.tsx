import Link from 'next/link';
import {TodoList} from '@/components/Todo/List';
import TodoFilters from "@/components/Todo/Filters";

export default async function Todos(props: { searchParams: Promise<any> }) {
    const searchParams = await props.searchParams;

    return (
        <section className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
            <Link
                href='/todos/create'
                className='inline-block bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-cyan-800 transition-colors duration-200'
            >
                Create a new todo
            </Link>
            <TodoFilters searchParams={searchParams} />
            <TodoList searchParams={searchParams} />
        </section>
    );
}
