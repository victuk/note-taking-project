import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Upload, Input, Form } from 'antd';
import Layout from '../../components/layouts/DefaultLayout';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import titleCase from '../../services/capitalizeWords';
import loginCheck from '../../services/checkIfLoggedIn';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  let [userDetails, setUserDetails] = useState({});

  const [fullNameState, editFullName] = useState(false);

  const [newName, setNewName] = useState('');

  const normFile = async (e) => {
    let formData = new FormData();
    formData.append('file', e.file.originFileObj);
    formData.append('upload_preset', 'dwwxmzhj');
    if(e.fileList.length > 0) {
      let response = await axios(
        {
          method: "post",
          url: "https://api.cloudinary.com/v1_1/dae4sosbl/image/upload",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      // let response = await axios.post('https://api.cloudinary.com/v1_1/dae4sosbl/image/upload', {
      //   file: e.fileList[0].name,
      //   'upload_preset': 'dwwxmzhj'
      // });
      let saveUrl = await axios.put('users/profile', {
        picture: response.data.secure_url,
        publicId: response.data.public_id
      })
    console.log(response);
    console.log(saveUrl);
    }
  };

  async function updateName() {
    let nameResponse = await axios.post('users/change-name', {
      fullName: newName
    });
    
    if(nameResponse.status == 200) {
      editFullName(false);
    }
  }


  async function fetchDetails() {
    let user = (await axios.get('users/profile', {headers: {token: localStorage.getItem('notesToken')}})).data;
    if(user) {
      setUserDetails(user.user);
      setNewName(titleCase(user.user.fullName))
    }
    // console.log(router.query.id);
  }

  useEffect(() => {
    async function fetchData() {
      let isLoggedIn = await loginCheck();
    if(isLoggedIn) {
      fetchDetails();
    } else {
      return router.push('/');
    }
    }
    fetchData();
  }, []);

  return(
    <div style={{textAlign: 'center'}}>

<div style={{ display: 'flex', height: '80vh', width: '100%', justifyContent: 'center',
    alignItems: 'center', flexDirection: 'column'}}>
      {userDetails.picture ? (
        <div style={{marginBottom: '20px'}}>
          <Image src={userDetails.picture} className='profile-picture' height='100' width='100' alt='Profile Picture' />
        </div>
      ) : (
        <div>
          <Image src="/avatar.webp" className='profile-picture' height='100' width='100' alt='Profile Picture' />
        </div>
      )}
{/* <Form>
<Form.Item
        name="upload"
        valuePropName="file"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" listType="picture">
          <Button icon={<UploadOutlined />}>Change</Button>
        </Upload>
      </Form.Item>
      </Form> */}

      {/* <Link href="/new-note"><Button type="primary">Edit Profile Picture</Button></Link> */}
      {fullNameState ? (
        <div>
          <Input value={newName} onChange={(e) => {setNewName(e.target.value)}} /> 
          {/* <Button type="primary" onClick={updateName}>Update Name</Button> */}
        </div>
        
      ) : (
        <div>
          <h2>Name: {newName}</h2> 
          {/* <Button type="primary" onClick={() => {editFullName(true)}}>Change Name</Button> */}
        </div>
      )}
      
        <h2>Email: {userDetails.email}</h2>
      
      </div>
      <style>
      {`
        .icon-style {
          font-size: 40px;
        }
        .profile-picture {
          border-radius: 50%;
        }
        `}
         </style>
    </div>
  );
}


Post.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
