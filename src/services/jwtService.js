import * as jwt_decode from 'jwt-decode';

export class JwtService {

  validateToken() {
    try {
      return jwt_decode(localStorage.getItem('token'));
    } catch (error) {
      return null;
    }
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
