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

  async createEmployee(data) {
    return (await axios.post(API.URL + 'users/employee', data, this.setHeaders()));
  }

  async getAllUsers(limit, page, search, column, order, status, roles) {
    return (await axios.get(API.URL +
      `users/roles?limit=${limit}&page=${page + 1}&search=${search}&column=${column}&order=${order}&status=${status}&roles[]${roles}`,
      this.setHeaders()));
  }

  async deleteUser(id) {
    return (await axios.delete(API.URL +
      `users/?id=${id}`));
  }

  async getUserById(id) {
    return (await axios.get(API.URL +
    `users?id=${id}`));
  }

  async updateUser(body) {
    return (await axios.put(API.URL +
    'users', body, this.setHeaders()));
  }

  async forgotPassword(user) {
    return (await axios.put(API.URL +
      'users/password/reset', user
    ));
  }
}
