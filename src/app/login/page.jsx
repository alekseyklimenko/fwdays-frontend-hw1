"use client";

import {useRef, useState} from "react";
import {useRouter} from "next/navigation";
import { login, signup } from './actions';
import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";

export default function LoginPage() {
    const router = useRouter();

    const [error, setError] = useState(null);
    const formRef = useRef();

    const handleSubmit = async (event, action) => {
        event.preventDefault();
        setError(null);
        if (!formRef.current) {
            return;
        }
        const formData = new FormData(formRef.current);
        try {
            await action(formData);
            router.push('/todos');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = async (event) => {
        await handleSubmit(event, login);
    }

    const handleSignup = async (event) => {
        await handleSubmit(event, signup);
    }

    return (
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
            <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
                <form ref={formRef} className='max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg'>
                    <div className='mb-6'>
                        <Label htmlFor='email' className='block text-lg font-medium text-gray-600'>
                            Email
                        </Label>
                        <Input
                            id='email'
                            name='email'
                            required
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500'
                        />
                    </div>

                    <div className='mb-6'>
                        <Label htmlFor='password' className='block text-lg font-medium text-gray-600'>
                            Password
                        </Label>
                        <Input
                            type={'password'}
                            id='password'
                            name='password'
                            required
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500'
                        />
                    </div>

                    {error && <div className='text-red-500 mb-4'>{error}</div>}

                    <Button
                        onClick={(e) => handleLogin(e)}
                        className='w-full bg-cyan-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                        Log in
                    </Button>

                    <Button
                        onClick={(e) => handleSignup(e)}
                        className='w-full bg-cyan-700 text-white py-2 px-4 mt-2 rounded-md shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                        Sign up
                    </Button>
                </form>
            </main>
        </div>
    );
};
