import type { Lead } from '../entities/Lead.js';

export interface ILeadRepository {
  findAll(): Promise<Lead[]>;
  findByEmail(email: string): Promise<Lead | null>;
  save(lead: Lead): Promise<Lead>;
}
