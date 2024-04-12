import React from 'react'
import Navbar from '../Components/Navbar'
import NotesSave from './NotesSave'
import { Typography } from '@material-tailwind/react'
import { useContext } from 'react'
import { UsernameContext } from '../App'

const Home : React.FC = () => {
    const username = useContext(UsernameContext);
  return (
    <>
    <Navbar route="Base" path="/base" />
      <div className="w-3/5 mx-auto">
        <Typography variant='lead'>{username} is now BeyondZero!! </Typography>
        <Typography variant="h3">Step beyond the ordinary note-taking experience, gather your thoughts in a single, organized hub.</Typography>
      </div>
       <NotesSave />
    </>
  )
}

export default Home