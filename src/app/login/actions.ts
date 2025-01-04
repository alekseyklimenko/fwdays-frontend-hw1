"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import {SignInWithPasswordCredentials} from "@supabase/auth-js/src/lib/types";
import {cookies} from "next/headers";

export async function login(formData: FormData) {
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
    const { error } = await supabase.auth.signInWithPassword(data as SignInWithPasswordCredentials);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/todos');
}

export async function signup(formData: FormData) {
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
    const { error } = await supabase.auth.signUp(data as SignInWithPasswordCredentials)

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/todos');
}
