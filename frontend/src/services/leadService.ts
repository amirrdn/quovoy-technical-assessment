import axios from 'axios';
import { Lead } from '../types/lead';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const leadService = {
  async getAllLeads(): Promise<Lead[]> {
    const response = await apiClient.get<Lead[]>('/leads');
    return response.data;
  },

  async createLead(leadData: Lead): Promise<Lead> {
    const response = await apiClient.post<Lead>('/leads', leadData);
    return response.data;
  },
};
