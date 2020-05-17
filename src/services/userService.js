import axios from 'axios';
import {API} from '../data/api';

export class UserService {
  axiosConfig = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  async userLogin(data) {
    return (await axios.post(API.URL + 'users/login', data,{headers: this.axiosConfig.headers}));
  }
}
