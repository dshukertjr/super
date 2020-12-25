import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { User } from '@supabase/gotrue-js/dist/main/lib/types'

const supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U')

export function useAuth() {
    return supabase.auth;
}

export function useUser() {
    const [user, setUser] = useState<User | null>();

    const getInitialUser = () => {
        const initialUser = supabase.auth.user();
        setUser(initialUser);
        console.log('initialUser is ', initialUser);
    }

    const listenToUserState = () => {
        console.log('user listen started');
        const { data: subscription, error } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('auth state changed. event: ', event, session);
            const newUser = supabase.auth.user();
            console.log('newUser', newUser);
            setUser(newUser);
        })
        console.log('subscription', subscription);
        console.log('error', error)
    }

    useEffect(() => {
        getInitialUser();
        listenToUserState();
    }, [])

    return user;
}

export function useDatabase<T>(table: string) {
    return supabase.from<T>(table);
}