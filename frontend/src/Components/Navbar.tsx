import React, { useState } from 'react'
import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import AskQuest from '../Components/AskQuest'

interface routeProp{
  route: string,
  path: string
}

const Navbar: React.FC<routeProp> = ({route, path}: routeProp) => {

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <div className="flex justify-between text-center flex-row w-3/5 mx-auto mt-5 mb-5">
        <div className='flex items-center'>
        <img src="/vite.svg" alt="icon" />
        <Typography variant='h6' className='ml-2'>BeyondZero</Typography>
        </div>
        <div>
          <span onClick={() => setShowOverlay(true)} >Ask?</span>
          <AskQuest
            showOverlay={showOverlay}
            closeOverlay={setShowOverlay}
          />          &nbsp;
          <Link to={path} >{route}</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar