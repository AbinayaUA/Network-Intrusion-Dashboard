import React, { useState } from 'react';
import { Activity, ShieldAlert, Server, Network } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import KPIGrid from './components/KPIGrid';
import MainCharts from './components/MainCharts';
import CyberMap from './components/CyberMap';
import ThreatFeedMarquee from './components/ThreatFeedMarquee';
import InvestigateView from './components/InvestigateView';
import { suspiciousConnections, kpiData } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleExportReport = () => {
    // Top Summary Header Data
    const summaryData = [
      ["--- SOC Network Security Audit Report ---"],
      [`Generated On:`, new Date().toLocaleString()],
      [`Total Connections:`, kpiData.totalConnections],
      [`Confirmed Attacks:`, kpiData.confirmedAttacks],
      [`Most Targeted Service:`, kpiData.mostTargetedService],
      [`Most Frequent Attack:`, kpiData.mostCommonAttack],
      [], // Empty row for spacing
      ["--- Suspicious Connections Log ---"],
      ["ConnectionID", "SourceIP", "TargetService", "Protocol", "Bytes", "RiskLevel", "AttackType", "Timestamp"]
    ];

    // Map table logs (simulating extra details via random IP/Attack data)
    const logData = suspiciousConnections.map(conn => [
      conn.id,
      `104.22.${Math.floor(Math.random()*10)}.${Math.floor(Math.random()*100)}`, // Simulated source IP
      conn.service,
      conn.protocol,
      conn.bytes,
      conn.risk.toUpperCase(),
      conn.risk === 'High' ? 'DoS / Neptune' : 'Probe', // Simulated Attack Type
      new Date().toISOString()
    ]);

    const combinedData = [...summaryData, ...logData];
    const csvContent = combinedData.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create hidden link and trigger download natively
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "SOC_Network_Security_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="scanline"></div>
      
      <header className="app-header">
        <div className="app-title">
          <ShieldAlert className="text-red animate-pulse" size={28} />
          <span>SOC Interface <span className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 400 }}>| NSL-KDD</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="cyber-button danger">Block Suspicious</button>
          <button 
            className="cyber-button"
            onClick={() => setCurrentView('investigate')}
          >
            Investigate
          </button>
          <button 
            className="cyber-button"
            onClick={handleExportReport}
          >
            Export Report
          </button>
        </div>
      </header>

      {currentView === 'dashboard' ? (
        <>
          <main className="dashboard-grid">
            <KPIGrid />
            <MainCharts />
            <CyberMap />
          </main>
          <ThreatFeedMarquee />
        </>
      ) : (
        <InvestigateView onBack={() => setCurrentView('dashboard')} />
      )}
    </>
  );
}

export default App;
