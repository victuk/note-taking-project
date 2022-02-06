import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { Row, Col } from 'antd';
import React, { useState, useEffect } from 'react'
import Nav from '../navs/IndexNav'
import Sidebar from '../Sidebar'


export default function DefaultLayout({children}) {
  return (
    <div style={{height: '100vh'}}>
    <Nav />
   
    <Image src="/note-background.jpg" layout="fill" style={{zIndex: '2'}} />

<main>

<Row>
  <Col xs={24} md={24} style={{height: '90vh', overflowY: 'auto', padding: '20px'}}>{children}</Col>
</Row>

</main>
    </div>
  );
}
