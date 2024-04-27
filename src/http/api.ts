import axios from 'axios';

class Api {
  private url: string;
  private headers: any;

  constructor({ url = '', headers = {} }) {
    this.url = url;
    this.headers = headers;
  }

  public getProducts = async () => {
    return await axios
      .get(`${this.url}/products`)
      .then((data) => data.data)
      .catch((err) => console.log(err));
  };
}

const api = new Api({
  url: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
    // Authorization: `Bearer ${localStorage.getItem('JWT')}`
  }
});
export default api;
