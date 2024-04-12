import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Input } from '@material-tailwind/react';
import AddRes from '../Components/AddRes';
import axios from 'axios';
import { UsernameContext } from '../App';

const NotesSave: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [resList, setResList] = useState<Array<string>>([]);
  const username = useContext(UsernameContext);

  const SaveNote = () => {
    const sendData = {
      username: username,
      title: title,
      note: value,
      resources: resList,
      created_at: (new Date()).toISOString()
    }

    setValue('');
    setTitle("");
    setResList([]);

    const url = 'http://127.0.0.1:8000/addnote';

    console.log(sendData);

    axios.post(url, sendData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(({ data }) => {
        console.log(data);
        alert(data)
      });

  }

  return (
    <>
      <div className='w-3/5 mx-auto '>
        <div className='flex text-center justify-between my-6 flex-wrap'>
          <h5 className="block mb-2 font-sans font-bold text-xl antialiased leading-snug tracking-normal text-blue-gray-900">
            / Add Note
          </h5>
          <Button size='sm' color='blue' variant='outlined' onClick={SaveNote}>Save Notes</Button>
        </div>
        <div className='my-6'>
          <p className='mb-2 font-sans text-xl text-gray-900 font-medium'>Title : </p>
          <Input
            type='text'
            placeholder='add title here'
            className='text-xl'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <ReactQuill theme="snow" value={value} onChange={setValue} style={{ height: "200px", marginBottom: "25px" }} />
        </div>
        <br />
        <AddRes resList={resList} setResList={setResList} />
      </div>
    </>

  )
}

export default NotesSave