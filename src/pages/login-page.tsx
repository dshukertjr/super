import React from 'react'
import { createClient } from '@supabase/supabase-js'
import Button from '@material-ui/core/Button'
import { User } from '@supabase/gotrue-js/dist/main/lib/types'

export default function LoginPage() {
    const supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U')

    const getData = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select()
        console.log(data)
    }

    const createUser = async () => {
        let user = getUser()
        if (!user) {
            console.log('user is not logged in, so login first')
            const { user, error: signUpError } = await supabase.auth.signUp({
                email: 'example+2@email.com',
                password: 'example-password',
            })
            console.log('user', user)
            console.log('error', signUpError)
        }

        const { data, error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    id: user!.id,
                    name: 'Tyler',
                }
            ])

        console.log('data', data)
        console.log('insertError', insertError)
    }

    const createPosts = async () => {
        const t0 = performance.now()

        const user = getUser()
        for (let i = 9999; i < 19999; i++) {
            const { data, error } = await supabase
                .from('posts')
                .insert([
                    {
                        user_id: user!.id,
                        text: `I would like to make this my ${i}th post`,
                        image_url: `https://picsum.photos/id/${i}/200/300`,
                        is_public: (i % 2) == 0,
                    }
                ])
            // console.log('data', data)
            if (error) console.log('error', error)
        }
        const t1 = performance.now()
        console.log(`that took ${(t1 - t0)} milliseconds`)
    }

    const login = async () => {
        const { user, error } = await supabase.auth.signIn({
            email: 'example+1@email.com',
            password: 'example-password',
        })
        console.log('user', user)
        console.log('error', error)
    }

    const logout = async () => {
        const error = await supabase.auth.signOut()
        console.log('error', error)
    }

    const getUser = (): User | null => {
        const session = supabase.auth.session()
        console.log('session', session)

        const user = supabase.auth.user()
        console.log('user', user)
        return user
    }

    const insertData = async () => {
        const { data, error } = await supabase
            .from('people')
            .insert([
                { name: 'Melon' }
            ])
        console.log('data', data)
        console.log('error', error)
    }

    const startListening = () => {
        const mySubscription = supabase
            .from('people')
            .on('*', payload => {
                console.log('Change received!', payload)
            })
            .subscribe()
        console.log('mySubscription', mySubscription)
    }
    return (
        <div>
            <h1>Home</h1>
            <Button onClick={getData}>Get Data</Button>
            <Button onClick={createUser}>Create User</Button>
            <Button onClick={login}>Login</Button>
            <Button onClick={logout}>logout</Button>
            <Button onClick={getUser}>Get User</Button>
            <Button onClick={insertData}>Insert Data</Button>
            <Button onClick={createPosts}>Create posts</Button>
            <Button onClick={startListening}>Start Listening</Button>
        </div>
    )
}