import React from 'react'
import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { dataType } from './Base'
import { List, ListItemPrefix, ListItem } from '@material-tailwind/react'
import { YoutubeIcon, DocIcon } from '../Components/ShowRes'
import DOMPurify from 'dompurify'

interface showdataProp{
  showdata: dataType | null
  setShowdata: React.Dispatch<React.SetStateAction<dataType | null>>
}

const ShowNote: React.FC<showdataProp> = ({showdata, setShowdata}) => {
  return (
    <>
      <div className="flex justify-between text-center flex-row w-3/5 mx-auto mt-5 mb-5">
        <div className='flex items-center'>
          <img src="/vite.svg" alt="icon" />
          <Typography variant='h6' className='ml-2'>BeyondZero</Typography>
        </div>
        <div>
          <Link to={'/base'} onClick={()=>{setShowdata(null)}}>Go back</Link>
        </div>
      </div>
      <div className='w-3/4 mx-auto'>
      <Typography
          variant='lead'
      >{showdata?.title}</Typography>
      <br />
      {
        showdata?.note ? <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize( showdata.note)}}></div> : "No Notes Availble"
      }
      <br />
      {
        showdata?.resources.map((url, index)=>(
          <List key={index}>
                <ListItem ripple = {false} className="py-1 pr-1 pl-4 hover:bg-white" key = {index}>
                <ListItemPrefix key={index}>
                  {url.includes("youtube") ? <YoutubeIcon /> : <DocIcon/>}
                </ListItemPrefix>
                <Typography
                        as="a"
                        href="https://google.com"
                        target="_blank"
                        color="white"
                        className="font-medium !text-gray-500 transition-colors hover:!text-gray-900"
                        key={index}
                      >
                        {url}
                      </Typography>
                </ListItem>
              </List>))
      }
      </div>
    </>
  )
}

export default ShowNote