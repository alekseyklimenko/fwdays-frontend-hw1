import Link from 'next/link';

export default async function Todos() {
    return (
        <section className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
            <Link
                href='/todos/create'
                className='inline-block bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-cyan-800 transition-colors duration-200'
            >
                Create a new todo
            </Link>
        </section>
    );
}
