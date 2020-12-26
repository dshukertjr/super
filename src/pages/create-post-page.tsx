import React from 'react'
import Button from '@material-ui/core/Button'
import { useDatabase } from '../hooks/supabaseHooks'
import { Question } from '../models/question'
import TextField from '@material-ui/core/TextField'
import * as yup from 'yup';
import { useFormik } from 'formik'

export default function CreateQuestion() {
    const questionsTable = useDatabase<Question>('questions');

    const createQuestion = async () => {
        // const { data, error } = await questionsTable.insert([
        //     {
        //         // question: 
        //     }
        // ]);
        // console.log('data', data);
        // if (error) console.error('question insert error: ', error);
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
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <h1>Create Question</h1>
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
                {/* <TextField id="question" label="Question" variant="outlined" helperText="Incorrect entry." />
                <TextField id="choice1" label="Choice 1" variant="outlined" />
                <TextField id="choice2" label="Choice 2" variant="outlined" /> */}
                <Button variant="contained" type="submit">Create Question</Button>
            </form>
        </div>
    )
}
