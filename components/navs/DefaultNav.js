import React, { useEffect, useState } from 'react';
import { Space, Button, Row, Col, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from '../Sidebar';
import Link from 'next/link';
import axios from 'axios';
import titleCase from '../../services/capitalizeWords';
import { useRouter } from 'next/router';
import loginCheck from '../../services/checkIfLoggedIn';

export default function ResponsiveAppBar () {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  let [name, setName] = useState('user');

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    async function fetchData() {
      let isLoggedIn = await loginCheck();
    if(isLoggedIn) {
      let res = await axios.get('users/profile', {headers: {token: localStorage.getItem('notesToken')}});
    let cappedName = res.data.user.fullName;
    setName(titleCase(cappedName));
    }
    }
    fetchData();
  }, []);

  function logOut() {
    localStorage.removeItem('notesToken');
    router.push('/');
  }

  return (
    <div style={{height: '8vh',
    display: 'flex',
    width: '100%',
    padding: '10px 20px',
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: '100',
    minHeight: '50px',
    borderBottom: '1px solid #e5e5e5',
    justifyContent: 'space-between'
  }}>
      <h2 style={{color: '#1890ff'}}><Link href="/notes" passHref>VNote</Link></h2>
      <div className="show-on-desktop">Welcome {name} <Link href='/profile/' passHref><Button type="primary">View Profile</Button></Link> <Button type="default" onClick={logOut}>Log Out</Button></div>
      <div className="show-on-mobile"><Button type="link" onClick={showDrawer}>
        <MenuOutlined />
      </Button></div>
      <Drawer title={'Welcome ' + name} placement="right" onClose={onClose} visible={visible}>
      
      <p><Link href='/new-note' passHref><Button type="primary" style={{ width: '100%' }}>Add Note</Button></Link></p>
        <p>
        <Row gutter={16}>
          <Col span={12}><Link href="/profile" passHref><Button type="primary" style={{ width: '100%' }}>View Profile</Button></Link></Col>
          <Col span={12}><Button type="default" style={{ width: '100%' }} onClick={logOut}>Log Out</Button></Col>
        </Row>
        </p>
        <div><Sidebar /></div>
      </Drawer>
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
