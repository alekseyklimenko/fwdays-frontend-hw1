"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from 'utils/supabase/server';
import {cookies} from "next/headers";

export async function login(formData) {
    const data = {
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        throw new Error('Invalid email address');
    }

    if (!data.password) {
        throw new Error('Password is required');
    }

    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/todos');
}

export async function signup(formData) {
    const data = {
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        throw new Error('Invalid email address');
    }

    if (!data.password) {
        throw new Error('Password is required');
    }

    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { error } = await supabase.auth.signUp(data)

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/todos');
    return 'Signup successful! Please check your email to verify your account.';
}
