import {commonService} from '../Services/CommonService';
import {teacherService} from '../Services/TeacherService';

const classApi = async ({setClassOption}) => {
  try {
    const data = await commonService.classes();
    setClassOption(data);
  } catch (error) {
    console.error(error);
  }
};
const boardApi = async ({setOption}) => {
  try {
    const data = await commonService.educationBoards();
    setOption(data);
  } catch (error) {
    console.error(error);
  }
};

const languageApi = async ({setOption}) => {
  try {
    const data = await commonService.language();
    setOption(data);
  } catch (error) {
    console.error(error);
  }
};
const subjectsApi = async ({setOption}) => {
  try {
    const data = await commonService.subjects();
    setOption(data);
  } catch (error) {
    console.error(error);
  }
};

// Check Teacher By Mobile
const checkTeacherByMobile = async ({mobileNumber}) => {
  try {
    console.log(mobileNumber)
    const data = await teacherService.teacherExistence({
      mobileNumber: mobileNumber,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {classApi, boardApi, languageApi, subjectsApi, checkTeacherByMobile};
