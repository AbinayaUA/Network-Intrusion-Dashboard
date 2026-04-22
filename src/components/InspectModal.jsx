import React from 'react';
import { X, Activity, ShieldAlert, Cpu, Database } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

const generateMiniTraffic = (risk) => {
  const base = risk === 'High' ? 80 : risk === 'Medium' ? 40 : 10;
  return Array.from({ length: 10 }).map((_, i) => ({
    time: `T-${10 - i}`,
    bytes: Math.floor(Math.random() * base) + base / 2
  }));
};

const InspectModal = ({ connection, onClose }) => {
  if (!connection) return null;

  const miniChartData = generateMiniTraffic(connection.risk);
  
  const getAIRecommendation = () => {
    if (connection.risk === 'High') {
      return "CRITICAL: Possible malicious payload detected or DoS signature match. Immediate block recommended.";
    } else if (connection.risk === 'Medium') {
      return "WARNING: Unusual protocol activity. Escalate for further analyst review.";
    } else {
      return "INFO: Connection flagged due to malformed packet, but volume is low. Monitor closely.";
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(5, 10, 16, 0.8)',
      backdropFilter: 'blur(5px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="panel" style={{ width: '600px', maxWidth: '90%', animation: 'pulse 0.3s ease-out' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Activity className="text-blue" />
            Connection Inspection: <span style={{ fontFamily: 'monospace' }}>{connection.id}</span>
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div className="kpi-title"><Cpu size={14} className="text-muted" style={{ display: 'inline', marginRight: '4px' }}/> Protocol / Service</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{connection.protocol} / {connection.service}</div>
          </div>
          <div>
            <div className="kpi-title"><ShieldAlert size={14} className="text-muted" style={{ display: 'inline', marginRight: '4px' }}/> Risk Level</div>
            <span className={`badge ${connection.risk.toLowerCase()}`} style={{ fontSize: '0.9rem' }}>{connection.risk}</span>
          </div>
          <div>
            <div className="kpi-title"><Database size={14} className="text-muted" style={{ display: 'inline', marginRight: '4px' }}/> Volume Transferred</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-yellow)' }}>{connection.bytes.toLocaleString()} Bytes</div>
          </div>
          <div>
            <div className="kpi-title">TCP/IP Flag</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-purple)' }}>{connection.flag}</div>
          </div>
        </div>

        {/* Mini Chart */}
        <div style={{ marginBottom: '2rem', height: '120px', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <div className="kpi-title" style={{ marginBottom: '0.5rem' }}>Traffic Burst Analysis (Last 10s)</div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={miniChartData}>
              <XAxis dataKey="time" hide />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', fontSize: '0.8rem' }}
                itemStyle={{ color: 'var(--color-green)' }}
              />
              <Area type="monotone" dataKey="bytes" stroke="var(--color-red)" fill="rgba(255, 51, 102, 0.2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div style={{ background: 'rgba(0, 255, 170, 0.05)', border: '1px solid var(--color-green)', borderRadius: '4px', padding: '1rem', marginBottom: '2rem' }}>
          <div className="kpi-title" style={{ color: 'var(--color-green)', marginBottom: '0.5rem' }}>System Recommendation</div>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{getAIRecommendation()}</div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button className="cyber-button" onClick={onClose}>Close</button>
          <button className="cyber-button danger">Block IP</button>
        </div>

      </div>
    </div>
  );
};

export default InspectModal;
