import axios from 'axios';
import { API } from '../data/api';
import {JwtService} from "./jwtService";

export class UserService {
  // services
  jwtTokenValidatorService;

  constructor() {
    this.jwtTokenValidatorService = new JwtService();
  }

  setHeaders() {
    const axisoHeader = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': this.jwtTokenValidatorService.getToken() && `Bearer ${this.jwtTokenValidatorService.getToken()}`
      }
    }
    return axisoHeader;
  }

  async userLogin(data) {
    return (await axios.post(API.URL + 'users/login', data));
  }

  async createUser(data) {
    return (await axios.post(API.URL + 'users/user', data));
  }

  async getAllUsers(limit, page, search, column, order, status, roles) {
    return (await axios.get(API.URL +
      `users/roles?limit=${limit}&page=${page + 1}&search=${search}&column=${column}&order=${order}&status=${status}&roles[]${roles}`,
      this.setHeaders()));
  }
}
