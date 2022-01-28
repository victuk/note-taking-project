import axios from 'axios';
import { createStore } from 'redux';


// let st = { value: [] }

async function notesReducer(state = { value: [] }, action) {
    switch (action.type) {
      case 'notes/update':
        let res = await axios.get('notes', {headers: {token: localStorage.getItem('notesToken')}});
        return {value: res.data};
      default:
        return state
    }
  }

  let store = createStore(notesReducer);

  export default store;
