import React from 'react'
import Button from '@material-ui/core/Button'
import { User } from '@supabase/gotrue-js/dist/main/lib/types'
import { useAuth, useDatabase } from '../hooks/supabaseHooks';
import { TableUser } from '../models/tableUser';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';

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

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const { user, error } = await auth.signIn({
                email: values.email,
                password: values.password,
            });
        },
    });

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button color="primary" variant="contained" type="submit">Create Question</Button>
            </form>
            {/* <Button onClick={createUser}>Create User</Button>
            <Button onClick={login}>Login</Button>
            <Button onClick={logout}>logout</Button>
            <Button onClick={getUser}>Get User</Button> */}
        </div>
    )
}