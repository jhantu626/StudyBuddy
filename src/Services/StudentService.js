import axios from 'axios';

class StudentService {
  constructor() {
    this.baseUrl = process.env.API_URL;
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
      console.error('yes error ', error);
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
    district
  }) {
    const uri = `${this.baseUrl}api/v1/student/registration-no-profile-pic?batchId=${batchId}&joiningYear=${joiningYear}&joiningMonth=${joiningMonth}`;
    const payload = {
      name: name,
      phone: mobile,
      guardianName: guardianName,
      guardianPhone: guardianPhone,
      gender: gender,
      joiningMonth: joiningMonth,
      joiningClass: joiningClass,
      address: address,
      state: state,
      district: district,
      pinCode: pinCode,
    };
    try {
        const response=axios.post(uri,payload,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        const data=(await response).data;
        return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
}

const studentService = new StudentService();

export {studentService};
