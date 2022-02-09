import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import axios from 'axios';
import { Button, Divider, Input, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Provider, useSelector } from 'react-redux';
import store from '../store/notestore';
import Layout from '../components/layouts/IndexLayout';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {counterReducer, initialstate} from '../store/notestore';
import loginCheck from '../services/checkIfLoggedIn';
import { useRouter } from 'next/router';

// const { Header, Content, Footer, Sider } = Layout;
// const { TextArea } = Input;
const { Title } = Typography;



export default function RecipeReviewCard() {

  return (
    <div>
    
    <div style={{ display: 'flex', height: '75vh', width: '100%', justifyContent: 'center',
    alignItems: 'center', flexDirection: 'column', zIndex: '10'}}>
      <h1 style={{zIndex: 'inherit', color: 'white'}}>Welcome to VNote</h1>
      <Title style={{zIndex: 'inherit', color: 'white', textAlign: 'center'}}>Create, save, edit notes quickly</Title>
      <div style={{flexDirection: 'row'}}>
      <Link href="/register" passHref><Button type="primary" size="large" style={{marginRight: '20px'}}>Register</Button></Link>
      <Link href="/login" passHref><Button type="default" size="large" ghost>Login</Button></Link>
      </div>
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
