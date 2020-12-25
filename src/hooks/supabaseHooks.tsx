import { useEffect, useState } from "react";
import { User } from '@supabase/gotrue-js/dist/main/lib/types'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U')

export function useAuth() {
    // const [user, setUser] = useState<User | null>();

    // const listenToUserState = () => {
    //     console.log('user listen started');
    //     const { data: subscription, error } = supabase.auth.onAuthStateChange((event, session) => {
    //         console.log('auth state changed. event: ', event, session);
    //         const newUser = supabase.auth.user();
    //         console.log('newUser', newUser);
    //         setUser(newUser);
    //     })
    //     console.log('subscription', subscription);
    //     console.log('error', error)
    // }

    // const logout = async () => {
    //     const error = await supabase.auth.signOut()
    //     console.log('error', error)
    // }

    // useEffect(() => {
    //     listenToUserState();
    // }, [])

    return supabase.auth;
}

export function useDatabase(table: string) {
    return supabase.from(table);
}