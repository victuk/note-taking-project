import axios from 'axios';
import { Button, Divider, Input, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layouts/DefaultLayout';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { useState, useEffect, createContext, useReducer } from 'react';
import {counterReducer, initialstate} from '../../store/notestore';
import { useRouter } from 'next/router'

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const Notescontext = createContext();

export default function RecipeReviewCard() {
  const router = useRouter();
  const { id } = router.query;

  let [edit, setEdit] = useState(false);
  let [note, setNote] = useState('');
  let [noteHead, setNoteHead] = useState('');
  let [noteBody, setNoteBody] = useState('');

  // const [state, dispatch] = useContext(Notescontext);

  const [state, dispatch] = useReducer(counterReducer, initialstate);

  useEffect(async () => {
    if(id != undefined) {
      let res = await axios.get(`note/${id}`, {headers: {token: localStorage.getItem('notesToken')}});
      setNote(res.data);
      setNoteHead(res.data.title);
      setNoteBody(res.data.body);
    }
    
    
    
  }, [id]);

  if(note.length == 0) {
    return (
      <div>Loading...</div>
    );
  }
  
  function buttonToggle () {
    setEdit(!edit);
  }

  async function saveNote() {
    let res = await axios.put(`note/${id}`, {title: noteHead, body: noteBody}, {headers: {token: localStorage.getItem('notesToken')}});
    console.log(res);
    if(res.data.success) {
      message.success('Update Successful');
      setEdit(false);
      // dispatch({type: 'UPDATE_NOTE'});
      router.reload(window.location.pathname)
      
    }
  }

  async function deleteNote() {
    let res = await axios.delete(`note/${id}`, {headers: {token: localStorage.getItem('notesToken')}});
    console.log(res);
    if(res.data.success) {
      message.success('Delete Successful');
      setEdit(false);
      // dispatch({type: 'UPDATE_NOTE'});
      router.push('/');
      
    }
  }

  function ToggleButtons() {

    

    if(edit) {
      return (
        <div style={{textAlign: 'right'}}>
        <Button type="primary" onClick={() => {saveNote();}}>Save</Button>
        <Button style={{marginLeft: '10px'}} onClick={buttonToggle}>Cancel</Button>
        </div>
      )
    }
    if(!edit) {
      return (
        <div style={{textAlign: 'right'}}>
        <Button type="primary" onClick={buttonToggle}>Edit</Button>
        <Button style={{marginLeft: '10px'}} onClick={deleteNote}>Delete</Button>
        </div>
      );
    }
  }




  return (
    <div>
    {!edit ? (
      <div>
      <ToggleButtons />

        <Divider />
        <div style={{ height: '10vh', fontWeight: 'bold' }}>{note.title}</div>
        <div style={{ height: '50vh' }}>{note.body}</div>
      </div>

    ) : (
      <div>
      <ToggleButtons />

        <Divider />
        <Input onChange={(e) => {setNoteHead(e.target.value)}} style={{ height: '10vh', marginBottom: '20px' }} value={noteHead} />
        <TextArea style={{ height: '50vh' }} onChange={(e) => {setNoteBody(e.target.value)}} value={noteBody} />
      </div>

    )}

    </div>
  );
}



RecipeReviewCard.getLayout = function getLayout(page) {
  const [state, dispatch] = useReducer(counterReducer, initialstate);
  return (
    <Notescontext.Provider value={{state, dispatch}}>
    <Layout>
      {page}
    </Layout>
    </Notescontext.Provider>
  )
}
