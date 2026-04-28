import type { ILeadRepository } from '../../domain/repositories/ILeadRepository.js';
import type { Lead } from '../../domain/entities/Lead.js';

export class GetAllLeads {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(): Promise<Lead[]> {
    return this.leadRepository.findAll();
  }
}
