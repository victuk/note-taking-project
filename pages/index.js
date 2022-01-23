import React, { useState, useEffect, createContext, useReducer } from 'react';
import axios from 'axios';
import { Button, Divider, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import store from '../store/notestore';
import Layout from '../components/layouts/DefaultLayout';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {counterReducer, initialstate} from '../store/notestore';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

export const Notescontext = createContext();


export default function RecipeReviewCard() {

  let [note, setNote] = useState([]);
  let [edit, setEdit] = useState(false);
  const [state, dispatch] = useContext(Notescontext);

  useEffect(() => {

  }, []);

  return (
    <div>
    <h1 style={{ display: 'flex', height: '80vh', width: '100%', justifyContent: 'center',
    alignItems: 'center'}}>No Note</h1>
    <Link href="/new-note"><Button type="link">Add Note</Button></Link>
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
