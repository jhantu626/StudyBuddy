import {commonService} from '../Services/CommonService';

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

export {classApi, boardApi, languageApi};
