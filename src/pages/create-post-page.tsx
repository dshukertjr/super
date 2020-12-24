import React from 'react'
import { createClient } from '@supabase/supabase-js'
import Button from '@material-ui/core/Button'
import { User } from '@supabase/gotrue-js/dist/main/lib/types'

function CreatePostPage() {
    const supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U')

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