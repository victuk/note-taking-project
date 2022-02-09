import Head from 'next/head'
import Image from 'next/image'
import { Row, Col } from 'antd';
import React, { useState, useEffect } from 'react'
import Nav from '../navs/IndexNav'


export default function DefaultLayout({children}) {
  return (
    <div style={{height: '100vh'}}>
      <Head>
        <title>VNote</title>
        <link rel='icon' href='/vnote.png' />
      </Head>
    <Nav />
   
    <Image src="/note-background.jpg" layout="fill" className="image-design-g" />

<main>

<Row>
  <Col xs={24} md={24} style={{height: '90vh', overflowY: 'auto', padding: '20px'}}>{children}</Col>
</Row>

</main>
    </div>
  );
}
