import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Question } from '../models/question'
import { useDatabase } from '../hooks/supabaseHooks'
import QuestionCell from '../components/questionCell'

export default function HomePage() {
  const questionsTable = useDatabase<Question>('questions');


  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getQuestions();
    // listenToQuestions();
  }, [])

  const getQuestions = async () => {
    const { data, error } = await questionsTable
      .select(`
      id,
      question,
      choices,
      userId,
      votes: votes_questionId_fkey(choice, userId),
      user: questions_userId_fkey(id, name)
      `)
      .order('createdAt', { ascending: false })
      .limit(10);
    if (data) {
      console.log('getData', data);
      setQuestions(data);
    }
    if (error) console.error('error', error);
  }

  // const listenToQuestions = () => {
  //   console.log('listener setting');
  //   const questionsSubscription = supabase
  //     .from<Question>(`questions:userId=eq.b2789ea7-a1ed-4a8e-be1a-396f017d59fd`)
  //     .on(`*`, payload => {
  //       console.log('Change received!', payload)
  //     })
  //     .subscribe()
  // }


  return <div>
    <div id="questions">
      {questions.map(question => <QuestionCell key={question.id} question={question}></QuestionCell>
      )}
    </div>
    <Button variant="contained" component={Link} to={'/create-post'}>
      Post a new Question
    </Button>
  </div >;
}

// class HomePage extends React.Component {
//   supabase = createClient('https://jkrdftyhktrpnhjwjhhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMjk0MDk1NiwiZXhwIjoxOTE4NTE2OTU2fQ.SDBQlVmSVh91ztRx8-3N2hNuPvhiDbjKR0nEcBKTr_U')
//   postsSubscription: RealtimeSubscription | null = null;

//   constructor(props: {}) {
//     super(props)
//   }

//   componentDidMount() {
//     this.getData();
//     this.startListening();
//   }

//   componentWillUnmount() {
//     this.postsSubscription?.unsubscribe();
//   }


//   render() {
//     return (
//       <div>
//         <Button variant="contained" component={Link} to={'/create-post'}>
//           create post
//         </Button>
//       </div >
//     )
//   }

//   async getData() {
//     const { data, error } = await this.supabase
//       .from('posts')
//       .select(`
//       text,
//       likes(id),
//       user: user_id(id, name)
//       `)
//       .order('id')
//       .limit(10)
//     console.log('getData', data)
//     console.log('error', error);
//   }

//   startListening() {
//     this.postsSubscription = this.supabase
//       .from('people')
//       .on('*', payload => {
//         console.log('Change received!', payload)
//       })
//       .subscribe()
//   }
// }
