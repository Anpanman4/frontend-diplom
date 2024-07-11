import axios from 'axios';

import { ProductType, ProductUpdatingType, UserBody } from './types';

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

  public createProduct = async (productData: ProductUpdatingType) => {
    const data = new FormData();
    Object.keys(productData).forEach((key) => {
      // eslint-disable-next-line
      // @ts-ignore
      data.append(key, productData[key]);
    });
    return await axios
      .post<ProductType>(`${this.url}/products/`, data, {
        headers: { ...this.headers, 'Content-Type': 'multipart/form-data' }
      })
      .then((data) => data.data)
      .catch((err) => console.log(err));
  };

  public updateProduct = async (
    id: string,
    productData: Omit<ProductUpdatingType, 'image'>
  ) => {
    console.log(`${this.url}/products/${id}`, productData);
    return await axios
      .patch<ProductType>(`${this.url}/products/${id}`, productData, {
        headers: this.headers
      })
      .then((data) => data.data)
      .catch((err) => console.log(err));
  };

  public updateProductVisibility = async (
    productId: string,
    isVisible: boolean
  ) => {
    return await axios
      .patch<ProductType>(
        `${this.url}/products/visible/${productId}`,
        {
          isVisible
        },
        { headers: this.headers }
      )
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
  url: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('hairgrad-JWT')}`
  }
});
export default api;
