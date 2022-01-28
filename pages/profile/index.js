import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Layout from '../../components/layouts/DefaultLayout';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  let [userDetails, setUserDetails] = useState({});



  async function fetchDetails() {
    let user = (await axios.get('users/profile', {headers: {token: localStorage.getItem('notesToken')}})).data;
    console.log(user.user);
    if(user) {
      setUserDetails(user.user);
    }
    // console.log(router.query.id);
  }

  useEffect(() => {
    fetchDetails()
  }, []);

  return(
    <div style={{textAlign: 'center'}}>
        <h2>Name: {userDetails.fullName}</h2>
        <h2>Email: {userDetails.email}</h2>
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
