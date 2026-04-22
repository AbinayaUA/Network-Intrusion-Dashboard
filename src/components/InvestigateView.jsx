import React from 'react';
import { 
  ArrowLeft, ShieldAlert, Target, ShieldCheck, FileWarning, Activity 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { timelineData, threatFeed } from '../data/mockData';

const InvestigateView = ({ onBack }) => {

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'pulse 0.5s ease-out' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: 0 }}>
          <button 
            className="cyber-button" 
            onClick={onBack}
            style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <span style={{ color: 'var(--color-red)' }}>Deep Investigation Mode</span>
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="cyber-button" style={{ borderColor: 'var(--color-green)', color: 'var(--color-green)' }}>
            <ShieldCheck size={16} /> Mark as Safe
          </button>
          <button className="cyber-button danger">
            <Target size={16} /> Block IP Segment
          </button>
          <button className="cyber-button" style={{ borderColor: 'var(--color-yellow)', color: 'var(--color-yellow)' }}>
            <FileWarning size={16} /> Escalate to Tier 2
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        
        {/* Timeline Analysis */}
        <div className="panel" style={{ gridColumn: 'span 8', minHeight: '400px' }}>
          <h3 className="panel-title"><Activity size={18} className="text-red" /> Focused Attack Timeline (Last 24h)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 41, 59, 0.5)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-neon)' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
                <Area type="monotone" dataKey="attack" stroke="var(--color-red)" fill="rgba(255, 51, 102, 0.3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Intelligence Feed */}
        <div className="panel" style={{ gridColumn: 'span 4', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 className="panel-title"><ShieldAlert size={18} className="text-yellow" /> Threat Intel Correlation</h3>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
            {threatFeed.map((alert, idx) => (
              <div key={idx} style={{ 
                background: 'rgba(255, 204, 0, 0.05)', 
                borderLeft: '3px solid var(--color-yellow)',
                padding: '1rem',
                fontSize: '0.9rem'
              }}>
                <div style={{ fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  {idx % 2 === 0 ? "Multiple failed login attempts" : "High packet transfer rate"}
                </div>
                <div style={{ color: 'var(--text-muted)' }}>{alert}</div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-blue)', fontFamily: 'monospace' }}>
                  MATCH CONFIDENCE: {Math.floor(Math.random() * 20 + 75)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern Match Details */}
        <div className="panel" style={{ gridColumn: 'span 12' }}>
          <h3 className="panel-title">Behavioral Analysis Notes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Protocol Pattern</div>
              <div style={{ color: 'var(--color-purple)' }}>High frequency UDP sweeping matching known external scanner signatures.</div>
            </div>
            <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Target Correlation</div>
              <div style={{ color: 'var(--color-blue)' }}>Multiple sources targeting the exact same internal subnet over port 21.</div>
            </div>
            <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Payload Heuristics</div>
              <div style={{ color: 'var(--color-green)' }}>No executable payloads detected in deep packet inspection. Likely reconnaissance.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigateView;
