import React, { useState, useEffect, createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { Button, Divider, Input, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import store from '../store/notestore';
import { Provider, useSelector } from 'react-redux';
import Layout from '../components/layouts/DefaultLayout';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import {counterReducer, initialstate} from '../store/notestore';
import loginCheck from '../services/checkIfLoggedIn';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;


export default function RecipeReviewCard() {

  const router = useRouter();

  let [noteHead, setNoteHead] = useState('');
  let [noteBody, setNoteBody] = useState('');
  // 
  // function updateStore() {
  //   {store.dispatch({type: 'UPDATE_NOTE', payload: []})};
  //   console.log('Updated');
  // }

  async function addNote() {
    let res = await axios.post('/note', {title: noteHead, body: noteBody}, {headers: {token: localStorage.getItem('notesToken')}});
    console.log(res);
    if(res.status == 200) {
      message.success('Success');
      router.push('/note/' + res.data.newNote._id);
    }
  }

  useEffect(() => {
    async function fetchData() {
      let isLoggedIn = await loginCheck();
    if(!isLoggedIn) {
      return router.push('/');
    }
    }
    fetchData();
  });

  return (
    <div>
      <div style={{textAlign: 'right'}}>
    <Button type="primary" onClick={addNote}>Add Note</Button>
        <Button style={{marginLeft: '10px'}}>Cancel</Button>
    </div>
<Divider />
<Input placeholder="Note Title" autoFocus onChange={(e) => {setNoteHead(e.target.value)}} style={{ height: '10vh', marginBottom: '20px' }} />
<TextArea style={{ height: '50vh' }} onChange={(e) => {setNoteBody(e.target.value)}} placeholder="Note body" />
    </div>
  );
}



RecipeReviewCard.getLayout = function getLayout(page) {
  return (
    <Provider store={store}>
    <Layout>
      {page}
    </Layout>
    </Provider>
  )
}
