import React from 'react'
import { createClient } from '@supabase/supabase-js'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Post } from '../models/post'
import RealtimeSubscription from '@supabase/realtime-js/dist/main/RealtimeSubscription'

class HomePage extends React.Component {
  supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U')
  posts: Post[] = [];
  postsSubscription: RealtimeSubscription | null = null;

  constructor(props: {}) {
    super(props)
  }

  componentDidMount() {
    this.getData();
    this.startListening();
  }

  componentWillUnmount() {
    this.postsSubscription?.unsubscribe();
  }


  render() {
    return (
      <div>
        <Button variant="contained" component={Link} to={'/create-post'}>
          create post
        </Button>
      </div >
    )
  }

  async getData() {
    const { data, error } = await this.supabase
      .from('posts')
      .select(`
      text,
      likes(id),
      user: user_id(id, name)
      `)
      .order('id')
      .limit(10)
    console.log('getData', data)
    console.log('error', error);
  }

  startListening() {
    this.postsSubscription = this.supabase
      .from('people')
      .on('*', payload => {
        console.log('Change received!', payload)
      })
      .subscribe()
  }
}

export default HomePage