'use client';

import React, { useState, useEffect, useCallback } from 'react';
import LeadForm from '@/components/LeadForm';
import LeadList from '@/components/LeadList';
import { Users } from 'lucide-react';
import { Lead } from '@/types/lead';
import { leadService } from '@/services/leadService';

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    try {
      const data = await leadService.getAllLeads();
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <main className="container">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '56px', 
          height: '56px', 
          background: 'rgba(99, 102, 241, 0.1)', 
          borderRadius: '12px',
          marginBottom: '1rem',
          color: 'var(--primary)'
        }}>
          <Users size={28} />
        </div>
        <h1>Lead Manager</h1>
        <p>Simple and efficient lead management.</p>
      </header>

      <div className="grid">
        <aside>
          <LeadForm onLeadAdded={fetchLeads} />
        </aside>
        
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Active Pipeline</h2>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Total: {leads?.length || 0}
            </span>
          </div>
          <LeadList leads={leads} loading={loading} />
        </section>
      </div>
    </main>
  );
}
