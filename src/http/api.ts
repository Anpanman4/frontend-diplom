import axios from 'axios';

import { UserBody } from './types';

class Api {
  private url: string;
  private headers: any;

  constructor({ url = '', headers = {} }) {
    this.url = url;
    this.headers = headers;
  }

  public setHeaders = (token: string) => {
    this.headers = { ...this.headers, Authorization: `Bearer ${token}` };
  };

  public getMe = async () => {
    return await axios
      .get(`${this.url}/users/me`, { headers: this.headers })
      .then((data) => data.data)
      .catch((err) => {
        if (err.response.status === 401)
          localStorage.setItem('hairgrad-JWT', '');
        return err;
      });
  };

  public updateUserInfo = async (body: {
    firstName: string;
    email: string;
  }) => {
    return await axios
      .patch(`${this.url}/users/me`, body, { headers: this.headers })
      .then((data) => data.data)
      .catch((err) => console.log(err));
  };

  public getProducts = async () => {
    return await axios
      .get(`${this.url}/products`)
      .then((data) => data.data)
      .catch((err) => console.log(err));
  };

  public getProductById = async (id: string) => {
    return await axios
      .get(`${this.url}/products/${id}`)
      .then((data) => data.data)
      .catch((err) => console.log(err));
  };

  public registration = async (user: UserBody) => {
    return await axios
      .post(`${this.url}/register`, user)
      .then(() => this.login({ email: user.email, password: user.password }));
  };

  public login = async (user: { email: string; password: string }) => {
    return await axios.post(`${this.url}/login`, user).then((data) => {
      localStorage.setItem('hairgrad-JWT', data.data.token);
      this.setHeaders(data.data.token);
      return data;
    });
  };
}

const api = new Api({
  url: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('hairgrad-JWT')}`
  }
});
export default api;
