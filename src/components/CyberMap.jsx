import React, { useState, useRef } from 'react';
import { Globe, Play, Pause, Server } from 'lucide-react';

// Enhanced attack data mapping exact IPs to specific target coordinates and services
export const extendedGlobalAttacks = [
  { id: 1, sourceIp: '45.33.12.11', startLat: 35.8617, startLng: 104.1954, endLat: 10, endLng: -50, type: 'DoS', protocol: 'TCP', service: 'HTTP (Web Server)', risk: 'High' },
  { id: 2, sourceIp: '192.168.1.45', startLat: 55.3781, startLng: -3.4360, endLat: 30, endLng: -110, type: 'Probe', protocol: 'UDP', service: 'FTP Server', risk: 'Medium' },
  { id: 3, sourceIp: '104.22.4.1', startLat: -23.5505, startLng: -46.6333, endLat: -10, endLng: -80, type: 'R2L', protocol: 'TCP', service: 'SSH Server', risk: 'High' },
  { id: 4, sourceIp: '203.0.113.50', startLat: 61.5240, startLng: 105.3188, endLat: 45, endLng: -40, type: 'U2R', protocol: 'ICMP', service: 'Database Server', risk: 'Low' },
  { id: 5, sourceIp: '185.39.10.1', startLat: -30.5595, startLng: 22.9375, endLat: 10, endLng: -50, type: 'DoS', protocol: 'TCP', service: 'HTTP (Web Server)', risk: 'High' }
];

// Target server nodes
const targetServers = [
  { id: 'web', name: 'Web Server', lat: 10, lng: -50 },
  { id: 'ftp', name: 'FTP Server', lat: 30, lng: -110 },
  { id: 'ssh', name: 'SSH Server', lat: -10, lng: -80 },
  { id: 'db', name: 'Database Server', lat: 45, lng: -40 }
];

const CyberMap = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeProgress, setTimeProgress] = useState(50);
  const [hoveredAttack, setHoveredAttack] = useState(null);
  const mapRef = useRef(null);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'var(--color-red)';
      case 'Medium': return 'var(--color-yellow)';
      case 'Low': return 'var(--color-blue)';
      default: return 'var(--color-green)';
    }
  };

  const handleMouseMove = (e, attack) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    setHoveredAttack({
      ...attack,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <>
      <div className="panel" style={{ gridColumn: 'span 12', position: 'relative', overflow: 'hidden', minHeight: '400px' }} ref={mapRef}>
        <h3 className="panel-title"><Globe size={18} className="text-blue" /> Focused Regional Cyber Attack Map</h3>
        
        {/* SVG Map Representation */}
        <div style={{ position: 'absolute', top: 50, left: 0, width: '100%', height: 'calc(100% - 50px)', opacity: 0.8 }}>
          <svg width="100%" height="100%" viewBox="-180 -90 360 180" preserveAspectRatio="xMidYMid slice">
            
            {/* Background Continents / Grid Simulation */}
            <g fill="rgba(30, 41, 59, 0.2)" stroke="var(--border-color)" strokeWidth="0.5">
              <rect x="-120" y="-50" width="60" height="80" rx="5" />
              <rect x="-30" y="-70" width="80" height="90" rx="5" />
              <rect x="60" y="-60" width="90" height="100" rx="5" />
              <rect x="-80" y="10" width="50" height="50" rx="5" />
              <rect x="20" y="-10" width="50" height="60" rx="5" />
              <rect x="110" y="-10" width="40" height="40" rx="5" />
            </g>

            {/* Target Server Nodes & Labels */}
            {targetServers.map(server => (
              <g key={server.id}>
                <circle cx={server.lng} cy={-server.lat} r="2.5" fill="var(--color-green)" />
                <circle cx={server.lng} cy={-server.lat} r="6" fill="none" stroke="var(--color-green)" strokeWidth="0.5" className="map-pulse" />
                <text 
                  x={server.lng + 8} 
                  y={-server.lat + 3} 
                  fill="var(--color-green)" 
                  fontSize="4" 
                  fontFamily="monospace"
                  style={{ textShadow: '0 0 2px black' }}
                >
                  {server.name}
                </text>
              </g>
            ))}

            {/* Simulated Attack Lines */}
            {extendedGlobalAttacks.map(attack => {
              const dx = attack.endLng - attack.startLng;
              const dy = attack.endLat - attack.startLat;
              const dr = Math.sqrt(dx * dx + dy * dy);
              const color = getRiskColor(attack.risk);

              return (
                <g key={attack.id}>
                  {/* Origin Pulse */}
                  <circle cx={attack.startLng} cy={-attack.startLat} r="1.5" fill={color} />
                  <text 
                    x={attack.startLng + 4} 
                    y={-attack.startLat - 2} 
                    fill={color} 
                    fontSize="3" 
                    fontFamily="monospace"
                  >
                    {attack.sourceIp}
                  </text>
                  
                  {/* Arc Path */}
                  {isPlaying && (
                    <path 
                      d={`M ${attack.startLng} ${-attack.startLat} Q ${(attack.startLng + attack.endLng)/2} ${-(attack.startLat + attack.endLat)/2 - dr*0.2} ${attack.endLng} ${-attack.endLat}`}
                      fill="none"
                      stroke={color}
                      strokeWidth="1.5"
                      opacity="0.7"
                      className="map-line"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => handleMouseMove(e, attack)}
                      onMouseMove={(e) => handleMouseMove(e, attack)}
                      onMouseLeave={() => setHoveredAttack(null)}
                    />
                  )}
                  {/* Invisible Wider Path for easier hovering */}
                  {isPlaying && (
                     <path 
                     d={`M ${attack.startLng} ${-attack.startLat} Q ${(attack.startLng + attack.endLng)/2} ${-(attack.startLat + attack.endLat)/2 - dr*0.2} ${attack.endLng} ${-attack.endLat}`}
                     fill="none"
                     stroke="transparent"
                     strokeWidth="6"
                     style={{ cursor: 'pointer' }}
                     onMouseEnter={(e) => handleMouseMove(e, attack)}
                     onMouseMove={(e) => handleMouseMove(e, attack)}
                     onMouseLeave={() => setHoveredAttack(null)}
                   />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Hover Tooltip */}
        {hoveredAttack && (
          <div style={{
            position: 'absolute',
            left: hoveredAttack.x + 15,
            top: hoveredAttack.y - 15,
            background: 'var(--bg-panel)',
            border: `1px solid ${getRiskColor(hoveredAttack.risk)}`,
            padding: '0.75rem',
            borderRadius: '4px',
            boxShadow: `0 4px 15px rgba(0,0,0,0.5), 0 0 10px ${getRiskColor(hoveredAttack.risk)}40`,
            zIndex: 100,
            fontSize: '0.85rem',
            pointerEvents: 'none',
            color: 'var(--text-main)',
            minWidth: '200px'
          }}>
            <div style={{ marginBottom: '4px' }}>
              <span className="text-muted">Source:</span> <span style={{ fontFamily: 'monospace' }}>{hoveredAttack.sourceIp}</span>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span className="text-muted">Target:</span> <strong>{hoveredAttack.service}</strong>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span className="text-muted">Attack Type:</span> <span>{hoveredAttack.type}</span>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span className="text-muted">Protocol:</span> <span>{hoveredAttack.protocol}</span>
            </div>
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
              <span className="text-muted">Risk Level:</span> 
              <span style={{ color: getRiskColor(hoveredAttack.risk), fontWeight: 'bold', marginLeft: '8px', textTransform: 'uppercase' }}>
                {hoveredAttack.risk}
              </span>
            </div>
          </div>
        )}

        {/* Legend Custom */}
        <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', background: 'rgba(0,0,0,0.5)', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-red)' }}></div>
            <span>High Risk Attack</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-yellow)' }}></div>
            <span>Medium Risk Attack</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-blue)' }}></div>
            <span>Low Risk Attack</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={14} className="text-green" />
            <span className="text-green">Internal System Target</span>
          </div>
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="panel" style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 className="panel-title" style={{ borderBottom: 'none', margin: 0, padding: 0 }}>Intrusion Timeline Playback</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="cyber-button" 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ padding: '0.5rem', borderRadius: '50%' }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={timeProgress}
            onChange={(e) => setTimeProgress(e.target.value)}
            style={{ 
              flex: 1, 
              accentColor: 'var(--color-green)',
              cursor: 'pointer'
            }} 
          />
          <span style={{ fontFamily: 'monospace', color: 'var(--color-green)' }}>
            T-{100 - timeProgress}m
          </span>
        </div>
      </div>
    </>
  );
};

export default CyberMap;
