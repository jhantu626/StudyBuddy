import axios from 'axios';
import {API_URL} from '@env';

class TeacherService {
  constructor() {
    this.baseUrl = API_URL;
  }

  async teacherExistence({mobileNumber}) {
    const uri = `${this.baseUrl}api/v1/teacher/check-by-mobile?mobile=${mobileNumber}`;
    try {
      const response = await axios.get(uri);
      const data = response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  // For all classes of a teacher
  async getAllClasses({authToken}) {
    const uri = `${this.baseUrl}api/v1/teacher/classes`;
    try {
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
  
  // For all subjects of a teacher
  async getAllSubjects({authToken}) {
    const uri = `${this.baseUrl}api/v1/teacher/subjects`;
    try {
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
  
  // For all boards of a teacher
  async getAllBoards({authToken}) {
    const uri = `${this.baseUrl}api/v1/teacher/boards`;
    try {
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
