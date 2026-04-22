export const kpiData = {
  totalConnections: "1.4M",
  totalNormal: "1.2M",
  totalSuspicious: "154K",
  confirmedAttacks: "46K",
  mostCommonAttack: "Neptune (DoS)",
  mostTargetedService: "HTTP (Port 80)"
};

export const attackCategoryData = [
  { name: 'DoS', value: 38400, color: '#ff3366' },
  { name: 'Probe', value: 5200, color: '#ffcc00' },
  { name: 'R2L', value: 1800, color: '#00ccff' },
  { name: 'U2R', value: 600, color: '#9d00ff' }
];

export const trafficDistribution = [
  { name: 'Normal', value: 85.7, fill: '#00ffaa' },
  { name: 'Attack', value: 14.3, fill: '#ff3366' }
];

export const timelineData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  normal: Math.floor(Math.random() * 50000 + 40000),
  attack: Math.floor(Math.random() * 10000 + (i === 14 || i === 15 ? 40000 : 1000)),
}));

export const protocolUsage = [
  { name: '00:00', tcp: 4000, udp: 2400, icmp: 400 },
  { name: '04:00', tcp: 3000, udp: 1398, icmp: 210 },
  { name: '08:00', tcp: 2000, udp: 9800, icmp: 1290 },
  { name: '12:00', tcp: 2780, udp: 3908, icmp: 2000 },
  { name: '16:00', tcp: 1890, udp: 4800, icmp: 2181 },
  { name: '20:00', tcp: 2390, udp: 3800, icmp: 2500 }
];

export const heatmapData = Array.from({ length: 50 }).map(() => ({
  srcBytes: Math.floor(Math.random() * 5000),
  dstBytes: Math.floor(Math.random() * 5000),
  z: Math.floor(Math.random() * 100),
  type: Math.random() > 0.8 ? 'anomaly' : 'normal'
}));

export const scatterDurationBytes = Array.from({ length: 100 }).map(() => ({
  duration: Math.random() * 60,
  bytes: Math.random() * 10000,
  isAnomaly: Math.random() > 0.9
}));

export const suspiciousConnections = [
  { id: '1e4', protocol: 'TCP', service: 'HTTP', bytes: 49201, flag: 'S0', risk: 'High' },
  { id: '1e5', protocol: 'UDP', service: 'Private', bytes: 105, flag: 'SF', risk: 'Medium' },
  { id: '1e6', protocol: 'ICMP', service: 'Eco_i', bytes: 8, flag: 'REJ', risk: 'Low' },
  { id: '1e7', protocol: 'TCP', service: 'FTP', bytes: 91023, flag: 'RSTR', risk: 'High' },
  { id: '1e8', protocol: 'TCP', service: 'SSH', bytes: 512, flag: 'S1', risk: 'Medium' }
];

export const threatFeed = [
  "Possible DoS detected on internal subnet (192.168.1.55)...",
  "Multiple failed login attempts from 104.22.4.1...",
  "Unusual traffic spike detected on port 21 (FTP)...",
  "Port scan blocked from unknown source (45.33.12.11)...",
  "Malformed ICMP packet dropped...",
  "U2R attempt detected on legacy web server...",
  "R2L payload matched signature CVE-2021-44228..."
];

export const globalAttacks = [
  { id: 1, startLat: 35.8617, startLng: 104.1954, endLat: 38.9072, endLng: -77.0369, type: 'DoS' },
  { id: 2, startLat: 55.3781, startLng: -3.4360, endLat: 38.9072, endLng: -77.0369, type: 'Probe' },
  { id: 3, startLat: -23.5505, startLng: -46.6333, endLat: 38.9072, endLng: -77.0369, type: 'R2L' },
  { id: 4, startLat: 61.5240, startLng: 105.3188, endLat: 38.9072, endLng: -77.0369, type: 'U2R' }
];
