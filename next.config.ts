import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_SUPABASE_URL: "https://skjngkdmmncxcbpcsujs.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNram5na2RtbW5jeGNicGNzdWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMjYwMjAsImV4cCI6MjA1MDcwMjAyMH0.a_U_4HqfMTN6W1NaytRyngp-BTAI6uuJ9wwYFAOSFbA"
    }
};

export default nextConfig;
