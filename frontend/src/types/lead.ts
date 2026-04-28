export enum LeadStatus {
  NEW = 'New',
  ENGAGED = 'Engaged',
  PROPOSAL_SENT = 'Proposal Sent',
  CLOSED_WON = 'Closed-Won',
  CLOSED_LOST = 'Closed-Lost'
}

export interface Lead {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt?: string;
}
