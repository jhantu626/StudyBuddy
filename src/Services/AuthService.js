import axios from 'axios';
import { API_URL } from '@env';

class AuthService {
  constructor() {
    // this.baseUrl = process.env.API_URL + 'api/v1';
    this.baseUrl = API_URL + 'api/v1';
  }

  async checkUserExistence({mobileNumber}) {
    const uri = `${this.baseUrl}/teacher/check-by-mobile?mobile=${mobileNumber}`;
    console.log('uri', uri);
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

  async registerTeacher({
    name,
    phone,
    gender,
    subjects,
    classes,
    boards,
    languages,
    profilePicture,
  }) {
    const uri = `${this.baseUrl}/auth/signup`;
    console.log('uri', uri);
    const payload = {
      name: name,
      phone: phone,
      gender: gender,
      subjects: subjects,
      classes: classes,
      boards: boards,
      languages: languages,
    };
    try {
      const formData = new FormData();
      formData.append('teacher', JSON.stringify(payload));
      formData.append('profile-pic', {
        uri: profilePicture.uri,
        type: profilePicture.type || 'image/jpeg',
        name: profilePicture.name || 'profile.jpg',
      });
      const response = await axios.post(uri, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
      const data = await error.response.data;
      return data;
    }
  }

  async login({mobileNumber}) {
    const uri = `${this.baseUrl}/auth/login?mobile=${mobileNumber}`;
    console.info("Logging ",uri)
    try {
      const response = await axios.post(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  async validateOtp({mobileNumber, otp}) {
    const uri = `${this.baseUrl}/auth/validate-otp?mobile=${mobileNumber}&otp=${otp}`;
    try {
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
}

const authService = new AuthService();
export {authService};
