import mongoose, { Schema, Document } from 'mongoose';
import { LeadStatus } from '../../domain/entities/Lead.js';

interface ILeadDocument extends Document {
  name: string;
  email: string;
  status: string;
  createdAt: Date;
}

const LeadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: Object.values(LeadStatus),
    default: LeadStatus.NEW 
  },
  createdAt: { type: Date, default: Date.now }
});

export const LeadModel = mongoose.model<ILeadDocument>('Lead', LeadSchema);
