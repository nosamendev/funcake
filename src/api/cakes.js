import axios from 'axios';

export default axios.create({
    baseURL: 'https://funcake-a855d.firebaseio.com/'
});