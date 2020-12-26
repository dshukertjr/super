import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { User } from '@supabase/gotrue-js/dist/main/lib/types'

const supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U')

export enum Database {
    questions = 'questions',
    users = 'users',
    votes = 'votes',
}

export function useAuth() {
    return supabase.auth;
}

export function useUser() {
    const [user, setUser] = useState<User | null>();

    const getInitialUser = () => {
        const initialUser = supabase.auth.user();
        setUser(initialUser);
    }

    const listenToUserState = () => {
        const { data: subscription, error } = supabase.auth.onAuthStateChange((event, session) => {
            const newUser = supabase.auth.user();
            setUser(newUser);
        })
    }

    useEffect(() => {
        getInitialUser();
        listenToUserState();
    }, [])

    return user;
}

export function useDatabase<T>(table: Database) {
    return supabase.from<T>(table);
}