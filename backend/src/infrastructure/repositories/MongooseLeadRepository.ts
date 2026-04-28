import type { ILeadRepository } from '../../domain/repositories/ILeadRepository.js';
import type { Lead } from '../../domain/entities/Lead.js';
import { LeadModel } from '../database/LeadModel.js';

export class MongooseLeadRepository implements ILeadRepository {
  async findAll(): Promise<Lead[]> {
    const leads = await LeadModel.find().sort({ createdAt: -1 });
    return leads.map(l => ({
      id: String(l._id),
      name: l.name,
      email: l.email,
      status: l.status as any,
      createdAt: l.createdAt
    }));
  }

  async findByEmail(email: string): Promise<Lead | null> {
    const lead = await LeadModel.findOne({ email });
    if (!lead) return null;
    return {
      id: String(lead._id),
      name: lead.name,
      email: lead.email,
      status: lead.status as any,
      createdAt: lead.createdAt
    };
  }

  async save(lead: Lead): Promise<Lead> {
    const newLead = new LeadModel(lead);
    const saved = await newLead.save();
    return {
      id: String(saved._id),
      name: saved.name,
      email: saved.email,
      status: saved.status as any,
      createdAt: saved.createdAt
    };
  }
}
