import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import ShowNote from './ShowNote';
import { Typography } from '@material-tailwind/react';
import {timeDifference} from '../utils';
import { UsernameContext } from '../App';

export interface dataType{
  title: string, 
  note: string,
  resources: Array<string>
  created_at: Date
}


const Base : React.FC = () => {
  const [data, setData] = useState<Array<dataType>>();
  const [showdata, setShowdata] = useState<dataType | null>(null);
  const user = useContext(UsernameContext);

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/base';
    axios.get(url, {
      params: {
        username: user
      }
    })
  .then((response) => {
    setData(response.data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error.message);
  });
  
  },[])
  
  if(showdata){
    return <ShowNote showdata = {showdata} setShowdata = {setShowdata} />
  }

  else{
    return (
      <>
      <Navbar route='Note' path='/'/>
      <br />
      <div className='w-3/5 mx-auto'>
      <Typography variant='h2'>| Base </Typography>
      <span>({user})</span>
      <br />
      <ul>
      {
        data?.map((note, index)=>{
          const date = new Date(note.created_at)
          const diff = timeDifference(date)
          return (
            <div key={index}>
            <Typography variant='h5' className='font-thin text-gray-500'>{diff}</Typography>
            <Typography
            key={index}
            variant='lead'
            onClick = {()=>{setShowdata(note)}}
            className=' text-lg hover:underline underline-offset-1 hover:cursor-pointer'
            
            >{note.title}</Typography>
            </div>
          )
        }
        )
      }
      </ul>
      </div>
      </>
    )
  }
}

export default Base