import { API_URL } from '@env';

class BatchService {
  constructor() {
    // this.baseUrl = process.env.API_URL + 'api/v1';
    this.baseUrl = API_URL+"api/v1";
  }

  // Create a batch
  async createBatch({
    authToken,
    batchName,
    startYear,
    endYear,
    startMonth,
    endMonth,
    startTime,
    endTime,
    days,
    monthlyFees,
    monthlyExamFees,
    board,
    language,
    subjects,
    classes,
  }) {
    const payload = {
      name: batchName,
      startYear: startYear,
      endYear: endYear,
      startMonth: startMonth,
      endMonth: endMonth,
      startTime: startTime,
      endTime: endTime,
      days: days,
      monthlyFees: monthlyFees,
      monthlyExamFees: monthlyExamFees,
      board: board,
      language: language,
      subjects: subjects,
      classes: classes,
    };
    try {
      console.log('payload', payload);
    } catch (error) {
      //   const data = await error.response.data;
      //   console.log('error', data);
      //   return data;
    }
  }
}

const batchService = new BatchService();

export {batchService};
