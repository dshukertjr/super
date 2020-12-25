import React from 'react'
import { createClient } from '@supabase/supabase-js'
import Button from '@material-ui/core/Button'
import { User } from '@supabase/gotrue-js/dist/main/lib/types'

function CreatePostPage() {
    const createQuestion = () => {
    }

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={createQuestion}>Start Listening</Button>
        </div>
    )
}

export default CreatePostPage;