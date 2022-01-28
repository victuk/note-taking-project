import { List, Avatar, Input, Button,  Affix } from 'antd';
import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import { Provider, useSelector } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';
import store from '../store/notestore';


const Notescontext = createContext();
// const [state, dispatch] = useContext(Notescontext);



function Sidebar (props, {datan}) {

  let [data, setData] = useState([]);
  // const updateNote = () => {
  //   {store.dispatch({type: 'UPDATE_NOTE', payload: []})}
  // }

  let val = useSelector((state) => state.value);
  

  function a() {
    store.dispatch({type: 'notes/update', payload: []})
  }

  useEffect(async () => {
    a();
  }, [val]);
  
  


  return (
    <div>
      {/* <Input placeholder="Search" /> */}

    <List
   itemLayout="horizontal"
   dataSource={data}
   renderItem={item => (
     <List.Item>
       <List.Item.Meta
         title={<Link href={'note/' + item._id}>{item.title}</Link>}
         description={item.body}
       />
     </List.Item>
   )}
 />
 {props.addButton && <Link href="/new-note"><Button type="primary" className="add-button">+</Button></Link>}

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


export default function sendThis() {
  return (
    <div>
    <Provider store={store}>
      <Sidebar />
    </Provider>
    </div>

  )
}