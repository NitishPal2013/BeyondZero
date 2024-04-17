import React, { useState } from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";

  interface usernameProp{
    setUsername: React.Dispatch<React.SetStateAction<string>>
  }

const CreateUser : React.FC<usernameProp> = ({setUsername}: usernameProp) => {

  const [user, setUser] = useState('');

  return (
    <>
    <img src="/mainlogo.png" width="64" height="64" alt="icon" className='mx-auto'/>
    <Typography variant='h2' className='text-center mt-2'>
    NoteQuest
    </Typography>
        <Card color="transparent" shadow={true} className='w-3/5 mx-auto mt-16 p-2 flex text-center'>
        <Typography color="gray" className="mt-1 font-normal">
          Go BeyondZero
        </Typography>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Raju"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none ",
              }}
              onChange={(e)=>{setUser(e.target.value)}}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={()=>setUsername(user)}>
            create user
          </Button>
      </Card>
    </>
  )
}

export default CreateUser