import { List, Avatar, Input, Button,  Affix } from 'antd';
import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import { Provider, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image'
import axios from 'axios';
import store from '../store/notestore';
import loginCheck from '../services/checkIfLoggedIn';
import { useRouter } from 'next/router';



function Sidebar (props) {

  let [data, setData] = useState([]);
  const router = useRouter();
  let [searchKeyword, setSearchKeyword] = useState('');
  let [searchData, setSearchData] = useState('');

  useEffect(async () => {
    let isLoggedIn = await loginCheck();
    if(isLoggedIn) {
      let res = await axios.get('notes', {headers: {token: localStorage.getItem('notesToken')}});
    setData(res.data);
    }
  }, []);

  useEffect(() => {
    if (searchKeyword.length > 0) {
      let result = data.filter(d => {
        if(d.title.toLowerCase().includes(searchKeyword) || d.body.toLowerCase().includes(searchKeyword)) {
          return d;
        }
      });
      setSearchData(result);
    }
  }, [searchKeyword]);
  

  return (
    <div>
      
      <img src="/note-background.jpg" className="show-on-desktop" style={{zIndex: '-2', position: 'fixed'}} />
      
    <div className="sidebar-padding">
    <Input placeholder="Search" onChange={(e) => setSearchKeyword(e.target.value)} />

    {searchKeyword.length > 0 ? (
      <List
      itemLayout="horizontal"
      dataSource={searchData}
      renderItem={item => (
        <List.Item>
          <Link href={'/note/' + item._id} style={{cursor: 'pointer'}}>
          <List.Item.Meta
            title={<h3 className="whatColor">{item.title}</h3>}
            description={<div className="whatColor">{item.body}</div>}
          />
          </Link>
        </List.Item>
      )}
    />
    ) : (
      <List
   itemLayout="horizontal"
   dataSource={data}
   renderItem={item => (
     <List.Item>
       <Link href={'/note/' + item._id} style={{cursor: 'pointer'}}>
       <List.Item.Meta
         title={<h3 className="what-color">{item.title}</h3>}
         description={<div className="what-color">{item.body}</div>}
       />
       </Link>
     </List.Item>
   )}
 />
    )}

    
    </div>
      
 {/* {props.addButton && <Link href="/new-note"><Button type="primary" className="add-button">+</Button></Link>} */}

 <style>
      {`
        .add-button {
          position: fixed;
          display: flex;
          bottom: 20px;
          left: 18%;
          padding: 20px;
          flex-direction: column;
          justify-content: center;
          border-radius: 50%;
        }
        `}
 </style>
    </div>

  );
}


export default function sendThis(props) {
  return (
    <div>
    <Provider store={store}>
      <Sidebar props />
    </Provider>
    </div>

  )
}

// export async function getStaticProps() {
//   // Fetch data from external API
//   let res = await axios.get('notes', {headers: {token: localStorage.getItem('notesToken')}});

//   // Pass data to the page via props
//   return { props: res }
// }
