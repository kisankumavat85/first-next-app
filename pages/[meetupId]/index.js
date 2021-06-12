import React, { Fragment } from 'react'
import Head from 'next/head'
import { MongoClient, ObjectId } from 'mongodb'

import MeetupDetail from '../../components/meetups/MeetupDetail'

const MeetupDetails = (props) => {
  return <Fragment>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name="description" content={props.meetupData.discription} />
    </Head>
    <MeetupDetail image={props.meetupData.image} address={props.meetupData.address} title={props.meetupData.title} description={props.meetupData.description} />
  </Fragment>

}

export const getStaticPaths = async () => {

  const client = await MongoClient.connect('mongodb+srv://kisan:Kisan123@cluster0.brkgm.mongodb.net/meetupsDB?retryWrites=true&w=majority')
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return {
    fallback: 'blocking',
    paths: meetupIds.map(id => ({
      params: {
        meetupId: id._id.toString()
      }
    }))
  }
}

export const getStaticProps = async (context) => {

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://kisan:Kisan123@cluster0.brkgm.mongodb.net/meetupsDB?retryWrites=true&w=majority')
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  }
}



export default MeetupDetails
