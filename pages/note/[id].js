import axios from 'axios';
import { Button, Divider, Input, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layouts/DefaultLayout';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import loginCheck from '../../services/checkIfLoggedIn';

const { TextArea } = Input;


export default function RecipeReviewCard() {
  const router = useRouter();
  const { id } = router.query;

  let [edit, setEdit] = useState(false);
  let [note, setNote] = useState('');
  let [noteHead, setNoteHead] = useState('');
  let [noteBody, setNoteBody] = useState('');

  useEffect(() => {
    async function fetchData() {
      let isLoggedIn = await loginCheck();
      if (isLoggedIn) {
        if (id != undefined) {
          let res = await axios.get(`note/${id}`, { headers: { token: localStorage.getItem('notesToken') } });
          setNote(res.data);
          setNoteHead(res.data.title);
          setNoteBody(res.data.body);
        }
      } else {
        return router.push('/');
      }
    }
    fetchData();

  }, [id]);

  if (note.length == 0) {
    return (
      <div>Loading...</div>
    );
  }

  function buttonToggle() {
    setEdit(!edit);
  }

  async function saveNote() {
    let res = await axios.put(`note/${id}`, { title: noteHead, body: noteBody }, { headers: { token: localStorage.getItem('notesToken') } });
    console.log(res);
    if (res.data.success) {
      message.success('Update Successful');
      setEdit(false);
      router.reload(window.location.pathname)

    }
  }

  async function deleteNote() {
    let res = await axios.delete(`note/${id}`, { headers: { token: localStorage.getItem('notesToken') } });
    console.log(res);
    if (res.data.success) {
      message.success('Delete Successful');
      setEdit(false);
      router.push('/notes');

    }
  }

  function ToggleButtons() {

    if (edit) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => { saveNote(); }}>Save</Button>
          <Button style={{ marginLeft: '10px' }} onClick={buttonToggle}>Cancel</Button>
        </div>
      )
    }
    if (!edit) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={buttonToggle}>Edit</Button>
          <Button style={{ marginLeft: '10px' }} onClick={deleteNote}>Delete</Button>
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
          <Input onChange={(e) => { setNoteHead(e.target.value) }} style={{ height: '10vh', marginBottom: '20px' }} value={noteHead} />
          <TextArea style={{ height: '50vh' }} onChange={(e) => { setNoteBody(e.target.value) }} value={noteBody} />
        </div>

      )}

    </div>
  );
}



RecipeReviewCard.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
