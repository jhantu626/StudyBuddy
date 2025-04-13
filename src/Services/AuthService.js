import axios from 'axios';

class AuthService {
  constructor() {
    this.baseUrl = process.env.API_URL + 'api/v1';
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
    const payload = {
      name: name,
      phone: phone,
      gender: gender,
      subjects: subjects,
      classes: classes,
      boards: boards,
      languages: languages,
    };
    console.log(uri)
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
      console.log(error)
      const data = await error.response.data;
      return data;
    }
  }
}

const authService = new AuthService();
export {authService};
