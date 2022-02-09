import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { Row, Col } from 'antd';
import React, { useState, useEffect } from 'react'
import Nav from '../navs/DefaultNav'
import Sidebar from '../Sidebar'


export default function DefaultLayout({children}) {
  return (
    <div style={{height: '100vh'}}>
      <Head>
        <title>VNote</title>
        <link rel='icon' href='/vnote.png' />
      </Head>
    <Nav />

<main>

<Row>
  <Col xs={0} md={6} style={{height: '92vh', overflowY: 'auto', borderRight: '1px solid #e5e5e5'}}><Sidebar addButton /></Col>
  <Col xs={24} md={18} style={{height: '92vh', overflowY: 'auto', padding: '20px', backgroundColor: 'white'}}>{children}</Col>
</Row>

</main>
    </div>
  );
}
