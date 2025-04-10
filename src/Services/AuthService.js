import axios from 'axios';

class AuthService {
  constructor() {
    this.baseUrl = process.env.API_URL + '/api/v1';
  }

  async checkUserExistence({mobileNumber}) {
    const uri = `${this.baseUrl}/teacher/check-by-mobile?mobile=${mobileNumber}`;
    try {
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
      const data = await error.response.data;
      return data;
    }
  }
}

const authService = new AuthService();
export {authService};
