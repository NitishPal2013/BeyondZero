import React, { useState } from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import {Spinner} from '@material-tailwind/react';
import axios from 'axios';
import { CrossIcon } from './ShowRes';
import { BASE_URL } from '../utils';
interface overlayProps{
    showOverlay: boolean,
    closeOverlay:  React.Dispatch<React.SetStateAction<boolean>>   
}

const Overlay : React.FC<overlayProps> = ({ showOverlay, closeOverlay }: overlayProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [clicked, setClicked] = useState(false);

  const handleBackgroundClick = (e : any) => {
    if (e.target.id === 'overlayBackground') {
      setAnswer('');
      closeOverlay(false);
    }
  };

  const getAnwer = ()=>{
    setClicked(true);
    const  url = BASE_URL+"/ask"
    
    axios.post(url, {query: inputValue}, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(({ data }) => {
        setAnswer(data);
      });
  }

  const clearForm = ()=>{
    setInputValue('');
    setAnswer('')
    setClicked(false);
  }

  if (!showOverlay) {
    return null;
  }

  return (
    <div
      id="overlayBackground"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center "
      onClick={handleBackgroundClick} 
    >
      <div className="bg-white p-8 rounded shadow-lg mb-96 w-3/5" onClick={(e) => e.stopPropagation()}>
        <div className='flex mb-4 items-center'>
        <img src="/mainlogo.png" width="42" height="42" alt="icon" />
        <Typography variant='h6' className=''>Ask Your Notes</Typography>
        </div>
        <div className='flex justify-between lg:flex-nowrap flex-wrap lg:space-x-3 flex-col lg:flex-row'>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border-2 border-gray-200 p-2 mb-2"
          placeholder='Type here'
          color='blue'
          icon={<span className='hover:cursor-pointer' onClick={clearForm}><CrossIcon/></span>}
        />
        <Button
        className='lg:m-0 mt-2'
        variant='filled'
        onClick={getAnwer}      
        >
          Ask
        </Button>
        <br />
        </div>
        {
          clicked ? answer ? <Typography className='mt-4'>{answer}</Typography> : <Spinner className='mx-auto text-xl mt-4'/> : ""
        }
      </div>
    </div>
  );
};

export default Overlay