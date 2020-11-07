import React from 'react';
import { createClient } from '@supabase/supabase-js'
import Button from '@material-ui/core/Button';

function HomePage() {
  const supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U');

  const getData = async () => {
    const { data, error } = await supabase
      .from('people')
      .select()
    console.log(data);
  }

  const createUser = async () => {
    const { user, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    })
    console.log('user', user);
    console.log('error', error);

  }

  const getUser = () => {
    const session = supabase.auth.session()
    console.log('session', session);

    const user = supabase.auth.user()
    console.log('user', user);
  }

  const insertData = async () => {
    const { data, error } = await supabase
      .from('people')
      .insert([
        { name: 'Melon' }
      ])
    console.log('data', data)
    console.log('error', error);
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
      <Button onClick={getUser}>Get User</Button>
      <Button onClick={insertData}>Insert Data</Button>
      <Button onClick={startListening}>start listening</Button>
    </div>
  );
}

export default HomePage;