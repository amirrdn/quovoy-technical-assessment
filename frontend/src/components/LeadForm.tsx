'use client';

import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import Select, { StylesConfig } from 'react-select';
import { LeadStatus } from '../types/lead';
import { leadService } from '../services/leadService';

interface LeadFormProps {
  onLeadAdded: () => void;
}

interface StatusOption {
  value: LeadStatus;
  label: string;
}

const statusOptions: StatusOption[] = Object.values(LeadStatus).map(status => ({
  value: status,
  label: status
}));

const customStyles: StylesConfig<StatusOption, false> = {
  control: (base, state) => ({
    ...base,
    background: 'var(--bg-dark)',
    borderColor: state.isFocused ? 'var(--primary)' : 'var(--border)',
    borderRadius: '8px',
    padding: '2px',
    color: 'var(--text-main)',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(99, 102, 241, 0.2)' : 'none',
    '&:hover': {
      borderColor: 'var(--primary)'
    }
  }),
  menu: (base) => ({
    ...base,
    background: 'var(--bg-card)',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    overflow: 'hidden'
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
    color: state.isSelected ? 'var(--primary)' : 'var(--text-main)',
    cursor: 'pointer',
    '&:active': {
      background: 'rgba(99, 102, 241, 0.2)'
    }
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--text-main)'
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--text-muted)'
  }),
  input: (base) => ({
    ...base,
    color: 'var(--text-main)'
  })
};

export default function LeadForm({ onLeadAdded }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: LeadStatus.NEW
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await leadService.createLead(formData);
      setFormData({ name: '', email: '', status: LeadStatus.NEW });
      onLeadAdded();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to add lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '700' }}>New Lead</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            required
            placeholder="e.g. john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <Select
            instanceId="lead-status-select"
            options={statusOptions}
            styles={customStyles}
            value={statusOptions.find(opt => opt.value === formData.status)}
            onChange={(opt) => setFormData({ ...formData, status: opt?.value || LeadStatus.NEW })}
          />
        </div>

        {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <><UserPlus size={18} /> Add Lead</>}
        </button>
      </form>
    </div>
  );
}
