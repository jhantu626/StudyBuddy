import axios from 'axios';
import {API_URL} from '../utils/config';
// import {API_URL} from '@env';

class StudentService {
  constructor() {
    // this.baseUrl = process.env.API_URL;
    // this.baseUrl = API_URL;
    this.baseUrl = API_URL;
  }

  // Check Student By Mobile Number
  async isStudentExist({mobile, authToken}) {
    const uri = `${this.baseUrl}api/v1/student/isStudentExist?mobile=${mobile}`;
    try {
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  // Get Student By Mobile Number
  async getStudentByMobileNumber({mobile, authToken}) {
    const uri = `${this.baseUrl}api/v1/student/mobile/${mobile}`;
    try {
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  // Create Student without profile pic
  async createStudentWithoutProfilePic({
    authToken,
    name,
    mobile,
    guardianName,
    guardianPhone,
    gender,
    joiningClass,
    batchId,
    joiningYear,
    joiningMonth,
    address,
    pinCode,
    state,
    district,
  }) {
    const uri = `${this.baseUrl}api/v1/student/registration-no-profile-pic?batchId=${batchId}&joiningYear=${joiningYear}&joiningMonth=${joiningMonth}`;
    const payload = {
      name: name,
      phone: mobile,
      guardianName: guardianName,
      guardianPhone: guardianPhone,
      gender: gender,
      joiningClass: joiningClass,
      address: address,
      state: state,
      district: district,
      pinCode: pinCode,
    };
    try {
      const response = axios.post(uri, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = (await response).data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  // Assign Students
  async assignStudents({
    authToken,
    studentId,
    batchId,
    joiningYear,
    joiningMonth,
  }) {
    const uri = `${this.baseUrl}api/v1/student/assign-batch?studentId=${studentId}&batchId=${batchId}&joiningYear=${joiningYear}&joiningMonth=${joiningMonth}`;
    try {
      const response=await axios.patch(uri,{},{
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })

      const data=await response.data;
      return data;
    } catch (error) {
      const data=await error.response.data;
      return data;
    }
  }
}

const studentService = new StudentService();

export {studentService};
