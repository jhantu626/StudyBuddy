// import { API_URL } from '@env';

import axios from 'axios';
import { API_URL } from '../utils/config';

class BatchService {
  constructor() {
    // this.baseUrl = process.env.API_URL + 'api/v1';
    // this.baseUrl = API_URL+"api/v1";
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
    console.log('payload', payload);
    const uri = `${this.baseUrl}/batch`;
    try {
      const response = await axios.post(uri, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      console.log('error', error);
      return data;
    }
  }

  async updateBatch({
    authToken,
    id,
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
    const uri=`${this.baseUrl}/batch`
    const payload = {
      id: id,
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
      const response=await axios.patch(uri,payload,{
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const data=await response.data;
      return data;
    } catch (error) {
      const data=await error.response.data;
      return data;
    }
  }

  // Get all batches
  async getAllBatches({authToken}) {
    const uri = `${this.baseUrl}/batch`;
    console.log('uri', uri);
    try {
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  // Deactivate a batch
  async deactivateBatch({authToken, batchId}) {
    const uri = `${this.baseUrl}/batch/${batchId}`;
    try {
      const response = await axios.delete(uri, {
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
}

const batchService = new BatchService();

export {batchService};
