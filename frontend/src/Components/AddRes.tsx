import React from 'react'
import { useState } from 'react';
import { Input, Button } from '@material-tailwind/react'
import validator from 'validator';
import ShowRes from './ShowRes';

export interface resListProp{
  resList: string[],
  setResList: React.Dispatch<React.SetStateAction<string[]>>
}


const AddRes: React.FC<resListProp> = ({resList, setResList}: resListProp) => {

  const [url, setUrl] = useState<string>('');

  const addResource: React.MouseEventHandler<HTMLButtonElement> | undefined = () => {
    if (validator.isURL(url)) {
      setResList([...resList, url]);
      setUrl("");
    }
  }

  const EnterClick: React.KeyboardEventHandler<HTMLInputElement> | undefined = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (validator.isURL(url)) {
        setResList([...resList, url]);
        setUrl("");
      }
    }
  }
  return (
    <>
      <div className='my-6 mt-2'>
        <p className='mb-2 font-sans text-gray-900 font-medium'>Resources</p>
        <div className="relative flex w-full ">
          <Input
            type="url"
            label='link'
            placeholder="link here"
            className="pr-20"
            error={url ? !validator.isURL(url) : false}
            success={url ? validator.isURL(url) : false}
            value={url}
            containerProps={{
              className: "min-w-0",
            }}
            onChange={(e) => {setUrl(e.target.value);}}
            onKeyDown={EnterClick}
          />
          <Button
            size="sm"
            className="!absolute right-1 top-1 rounded mb-1"
            color={url ? validator.isURL(url) ? 'green' : undefined : undefined}
            disabled ={url ? validator.isURL(url) ? false : true : true}
            variant='filled'
            onClick={addResource}
          >
            Add Link
          </Button>
        </div>
      </div>
      <ShowRes URLlist={resList} setURLlist={setResList} />
    </>
  )
}

export default AddRes