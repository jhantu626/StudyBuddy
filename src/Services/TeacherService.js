import axios from 'axios';

class TeacherService {
  constructor() {
    this.baseUrl = process.env.API_URL;
  }

  async teacherExistence({mobileNumber}) {
    const uri = `${this.baseUrl}api/v1/teacher/check-by-mobile?mobile=${mobileNumber}`;
    console.log(uri);
    try {
      const response = await axios.get(uri);
      const data = response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
}

const teacherService = new TeacherService();

export {teacherService};
