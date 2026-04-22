import React from 'react';
import { kpiData } from '../data/mockData';

const KPIGrid = () => {
  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-title">Total Connections</div>
        <div className="kpi-value text-blue">{kpiData.totalConnections}</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-title">Normal Traffic</div>
        <div className="kpi-value text-green">{kpiData.totalNormal}</div>
      </div>
      <div className="kpi-card alert">
        <div className="kpi-title">Suspicious Traffic</div>
        <div className="kpi-value text-yellow">{kpiData.totalSuspicious}</div>
      </div>
      <div className="kpi-card alert">
        <div className="kpi-title">Confirmed Attacks</div>
        <div className="kpi-value text-red">{kpiData.confirmedAttacks}</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-title">Top Attack Type</div>
        <div className="kpi-value text-muted" style={{ fontSize: '1.2rem' }}>{kpiData.mostCommonAttack}</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-title">Targeted Service</div>
        <div className="kpi-value text-muted" style={{ fontSize: '1.2rem' }}>{kpiData.mostTargetedService}</div>
      </div>
    </div>
  );
};

export default KPIGrid;
