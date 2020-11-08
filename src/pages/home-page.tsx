import React from 'react'
import { createClient } from '@supabase/supabase-js'
import Button from '@material-ui/core/Button'
import { User } from '@supabase/gotrue-js/dist/main/lib/types'
import { Post } from '../models/post'
import { Link } from 'react-router-dom'

function HomePage() {
  const supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U')

  const getData = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select()
    console.log(data)
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
      <Button variant="contained" component={Link} to={'/create-post'}>
        create post
      </Button>

    </div>
  )
}

export default HomePage