'use client';

import React from 'react';
import { Mail, Calendar, User as UserIcon } from 'lucide-react';
import { Lead, LeadStatus } from '../types/lead';

interface LeadListProps {
  leads: Lead[];
  loading: boolean;
}

export default function LeadList({ leads, loading }: LeadListProps) {
  const getBadgeClass = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.NEW: return 'badge-new';
      case LeadStatus.ENGAGED: return 'badge-engaged';
      case LeadStatus.PROPOSAL_SENT: return 'badge-proposal';
      case LeadStatus.CLOSED_WON: return 'badge-won';
      case LeadStatus.CLOSED_LOST: return 'badge-lost';
      default: return '';
    }
  };

  if (loading) {
    return <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>Loading leads...</div>;
  }

  return (
    <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="table-container">
        {leads?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <UserIcon size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>No leads found yet.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Lead</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {leads?.map((lead) => (
                <tr key={lead._id || lead.id}>
                  <td>
                    <div style={{ fontWeight: '600' }}>{lead?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Mail size={12} /> {lead?.email}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getBadgeClass(lead?.status)}`}>
                      {lead?.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} />
                      {lead?.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
