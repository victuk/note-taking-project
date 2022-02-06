import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import axios from 'axios';
import { Button, Divider, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Provider, useSelector } from 'react-redux';
import store from '../store/notestore';
import Layout from '../components/layouts/IndexLayout';
import { InstagramFilled, TwitterSquareFilled, FacebookFilled, LinkedinFilled, GlobalOutlined, WhatsAppOutlined } from '@ant-design/icons';
import {counterReducer, initialstate} from '../store/notestore';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;




export default function RecipeReviewCard() {


  return (
    <div>
    <div style={{ display: 'flex', height: '80vh', width: '100%', justifyContent: 'center',
    alignItems: 'center', flexDirection: 'column'}}>
      <div  style={{display: 'block', color: 'white'}}>
        
        <div style={{marginBottom: '50px'}}>
        <h1 style={{color: 'white'}}>About VNote</h1>
        <div>This web app can be used to take short notes anytime anywhere...</div>
        </div>
        
        <div>
          <div style={{marginBottom: '50px'}}>
            <h1 style={{color: 'white'}}>About the Developer</h1>
            <div>This web app was developed by Victor Peter using MongoDB, ExpressJS, NextJS and NodeJS.</div>
          </div>
        
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Link href='https://vred.netlify.com'><GlobalOutlined className="icon-style" /></Link>
          <Link href='https://web.facebook.com/vreddd'><FacebookFilled className="icon-style" /></Link>
          <Link href='https://www.instagram.com/victor_p3t3r/'><InstagramFilled className="icon-style" /></Link>
          <Link href='https://twitter.com/ukokjnr'><TwitterSquareFilled className="icon-style" /></Link>
          <Link href='https://www.linkedin.com/in/victor-ukok/'><LinkedinFilled className="icon-style" /></Link>
          <Link href='https://wa.me/+2348137249484'><WhatsAppOutlined className="icon-style" /></Link>
        </div>
        </div>
      </div>
      </div>
      
      <style>
      {`
        .icon-style {
          font-size: 40px;
        }

        

        `}
         </style>
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
