import React from 'react';
import { createClient } from '@supabase/supabase-js'
import Button from '@material-ui/core/Button';

function HomePage() {
  const supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U');
  const getData = async () => {
    const { user, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    })
    console.log('user', user);
    console.log('error', error);
  }

  const getSession = () => {
    const session = supabase.auth.session()
    console.log('session', session);
  }
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={getSession}>Get Session</Button>
      <Button onClick={getData}>Get Data</Button>
    </div>
  );
}

export default HomePage;