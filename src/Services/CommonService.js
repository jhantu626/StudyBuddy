import axios from 'axios';
import { API_URL } from '@env';


class CommonService {
  constructor() {
    this.baseUrl = API_URL;
  }
  async classes() {
    const uri = `${this.baseUrl}api/v1/class`;
    console.log(uri)
    try {
      const response = await axios.get(uri);
      const data = response.data;
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }

  async educationBoards() {
    const uri = `${this.baseUrl}api/v1/board`;
    try {
      const response = await axios.get(uri);
      const data = response.data;
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async language() {
    const uri = `${this.baseUrl}api/v1/language`;
    try {
      const response = await axios.get(uri);
      const data = response.data;
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async subjects() {
    const uri = `${this.baseUrl}api/v1/subjects`;
    try {
      const response = await axios.get(uri);
      const data = response.data;
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
}

const commonService = new CommonService();

export {commonService};
