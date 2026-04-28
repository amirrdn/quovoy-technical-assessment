import type { ILeadRepository } from '../../domain/repositories/ILeadRepository.js';
import type { Lead } from '../../domain/entities/Lead.js';
import { auditLog } from '../../infrastructure/logging/AuditLogger.js';

export class CreateLead {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(leadData: Lead): Promise<Lead> {
    const existing = await this.leadRepository.findByEmail(leadData.email);
    if (existing) {
      throw new Error('Lead with this email already exists');
    }

    const savedLead = await this.leadRepository.save(leadData);
    
    // Audit Log: {username} + {trigger activity} + {id/email}
    auditLog('system', 'create-lead', savedLead.email);

    return savedLead;
  }
}
