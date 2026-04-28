import type { Request, Response } from 'express';
import { CreateLead } from '../../../application/use-cases/CreateLead.js';
import { GetAllLeads } from '../../../application/use-cases/GetAllLeads.js';
import { MongooseLeadRepository } from '../../../infrastructure/repositories/MongooseLeadRepository.js';

const leadRepository = new MongooseLeadRepository();
const createLeadUseCase = new CreateLead(leadRepository);
const getAllLeadsUseCase = new GetAllLeads(leadRepository);

export class LeadController {
  async getLeads(req: Request, res: Response) {
    try {
      const leads = await getAllLeadsUseCase.execute();
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createLead(req: Request, res: Response) {
    try {
      const lead = await createLeadUseCase.execute(req.body);
      res.status(201).json(lead);
    } catch (error: any) {
      const status = error.message === 'Lead with this email already exists' ? 400 : 500;
      res.status(status).json({ message: error.message });
    }
  }
}
