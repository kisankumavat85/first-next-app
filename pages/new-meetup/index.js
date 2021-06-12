import { useRouter } from 'next/router'
import Head from 'next/head'
import { Fragment } from 'react'

import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {

  const router = useRouter()

  const addMeetupHandler = async (enteredMeetupData) => {
    console.log(enteredMeetupData);
    const responce = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await responce.json()
    console.log(data);

    router.push('/')

  }

  return <Fragment>
    <Head>
      <title>Add new Meetup</title>
      <meta name="description" content="Add your own meetups" />
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </Fragment>
}

export default NewMeetupPage
