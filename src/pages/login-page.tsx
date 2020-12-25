import React from 'react'
import Button from '@material-ui/core/Button'
import { User } from '@supabase/gotrue-js/dist/main/lib/types'
import { useAuth, useDatabase } from '../hooks/supabaseHooks';
import { TableUser } from '../models/tableUser';

export default function LoginPage() {
    const auth = useAuth();
    const usersTable = useDatabase<TableUser>('users');

    const createUser = async () => {
        let user = getUser()
        if (!user) {
            console.log('user is not logged in, so login first')
            const { user, error: signUpError } = await auth.signUp({
                email: 'example+2@email.com',
                password: 'example-password',
            })
            console.log('user', user)
            console.log('error', signUpError)
        }

        const { data, error: insertError } = await usersTable
            .insert([
                {
                    id: user!.id,
                    name: 'Tyler',
                }
            ])

        console.log('data', data)
        console.log('insertError', insertError)
    }

    const login = async () => {
        const { user, error } = await auth.signIn({
            email: 'example+2@email.com',
            password: 'example-password',
        })
        console.log('user', user)
        console.log('error', error)
    }

    const logout = async () => {
        const error = await auth.signOut()
        console.log('error', error)
    }

    const getUser = (): User | null => {
        const session = auth.session()
        console.log('session', session)

        const user = auth.user()
        console.log('user', user)
        return user
    }

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={createUser}>Create User</Button>
            <Button onClick={login}>Login</Button>
            <Button onClick={logout}>logout</Button>
            <Button onClick={getUser}>Get User</Button>
        </div>
    )
}