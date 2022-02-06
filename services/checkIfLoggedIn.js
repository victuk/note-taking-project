import axios from 'axios';


export default async function checkIfLoggedIn() {
    if(localStorage.getItem('notesToken')) {
        let res = (await axios.get('users/profile', {headers: {token: localStorage.getItem('notesToken')}})).data;
        if(res.success) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}