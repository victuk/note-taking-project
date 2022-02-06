import React, { useEffect, useState } from 'react';
import { Space, Button, Row, Col, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from '../Sidebar';
import Link from 'next/link';
import axios from 'axios';
import { HomeFilled } from '@ant-design/icons';

export default function ResponsiveAppBar () {


  const [visible, setVisible] = useState(false);
  let [name, setName] = useState('');

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // useEffect(async () => {
  //   let res = await axios.get('users/profile', {headers: {token: localStorage.getItem('notesToken')}});
  //   setName(res.data.user.fullName);
  // });

  return (
    <div style={{height: '8vh',
    display: 'flex',
    width: '100%',
    padding: '10px 20px',
    flexDirection: 'row',
    zIndex: '100',
    minHeight: '50px',
    justifyContent: 'space-between'
  }}>
      <Link href="/"><h2 style={{color: 'white', zIndex: '100', pointer: 'cursor'}}>VNote</h2></Link>
      <div style={{color: 'white', zIndex: '100'}}> 
      <Link href='/'><Button type="link"><HomeFilled /></Button></Link>
       <Link href='/about'><Button type="link" style={{border: '1px solid blue'}}>About</Button></Link></div>
      <style jsx>
        {`

          .space-align-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.space-align-block {
  flex: none;
  margin: 8px 4px;
  padding: 4px;
  border: 1px solid #40a9ff;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}

          `}
      </style>

    </div>
  );
};
