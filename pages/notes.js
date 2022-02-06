import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import axios from 'axios';
import { Button, Divider, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Provider, useSelector } from 'react-redux';
import store from '../store/notestore';
import Layout from '../components/layouts/DefaultLayout';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {counterReducer, initialstate} from '../store/notestore';
import loginCheck from '../services/checkIfLoggedIn';
import { useRouter } from 'next/router';


const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;




export default function RecipeReviewCard() {
  const router = useRouter();
  useEffect(async () => {
    let isLoggedIn = await loginCheck()
    if(isLoggedIn) {
      
    } else {
      return router.push('/');
    }
  });


  return (
    <div>
    <div style={{ display: 'flex', height: '80vh', width: '100%', justifyContent: 'center',
    alignItems: 'center', flexDirection: 'column'}}>
      <h1>No Note</h1>
      <Link href="/new-note"><Button type="primary">Add Note</Button></Link>
      </div>
    
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

// export async function getServerSideProps(context) {
//   {store.dispatch({type: 'UPDATE_NOTE', payload: []})}
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
