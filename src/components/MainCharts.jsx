import React, { useState } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { AlertCircle, Activity, ShieldAlert, Crosshair, Filter } from 'lucide-react';
import { 
  attackCategoryData, trafficDistribution, timelineData, 
  protocolUsage, heatmapData, scatterDurationBytes, suspiciousConnections
} from '../data/mockData';
import InspectModal from './InspectModal';

const COLORS = ['#00ffaa', '#ff3366', '#ffcc00', '#00ccff', '#9d00ff'];

const MainCharts = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [riskFilter, setRiskFilter] = useState('All');
  const [inspectingConn, setInspectingConn] = useState(null);

  const filteredConnections = suspiciousConnections.filter(conn => 
    riskFilter === 'All' ? true : conn.risk === riskFilter
  );

  return (
    <>
      {/* Controls / Filters */}
      <div className="panel" style={{ gridColumn: 'span 12', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Filter className="text-blue" size={20} />
        <span style={{ fontWeight: 600, color: 'var(--text-main)', marginRight: '1rem' }}>Global Filters:</span>
        
        <select 
          className="cyber-button" 
          style={{ background: 'var(--bg-dark)' }}
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1h">Last 1 Hour</option>
          <option value="6h">Last 6 Hours</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select>

        <select 
          className="cyber-button" 
          style={{ background: 'var(--bg-dark)' }}
          value={riskFilter} 
          onChange={(e) => setRiskFilter(e.target.value)}
        >
          <option value="All">All Risks</option>
          <option value="High">High Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="Low">Low Risk</option>
        </select>
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <div className="badge low">System Online</div>
          <div className="badge high animate-pulse">Threat Detected</div>
        </div>
      </div>

      {/* Traffic Activity Line Chart */}
      <div className="panel" style={{ gridColumn: 'span 8', minHeight: '350px' }}>
        <h3 className="panel-title"><Activity size={18} className="text-green" /> Network Traffic Activity</h3>
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <ResponsiveContainer>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="time" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-neon)' }}
                itemStyle={{ color: 'var(--text-main)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="normal" stroke="var(--color-green)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="attack" stroke="var(--color-red)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Distribution Pie */}
      <div className="panel" style={{ gridColumn: 'span 4', minHeight: '350px' }}>
        <h3 className="panel-title"><ShieldAlert size={18} className="text-yellow" /> Traffic Distribution</h3>
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={trafficDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {trafficDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attack Categories Bar Chart */}
      <div className="panel" style={{ gridColumn: 'span 6', minHeight: '350px' }}>
        <h3 className="panel-title"><Crosshair size={18} className="text-red" /> Attack Categories</h3>
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <ResponsiveContainer>
            <BarChart data={attackCategoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false}/>
              <XAxis type="number" stroke="var(--text-muted)" />
              <YAxis dataKey="name" type="category" stroke="var(--text-muted)" width={60} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {attackCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Protocol Stacked Bar Chart */}
      <div className="panel" style={{ gridColumn: 'span 6', minHeight: '350px' }}>
        <h3 className="panel-title"><AlertCircle size={18} className="text-blue" /> Protocol Usage</h3>
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <ResponsiveContainer>
            <BarChart data={protocolUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }} />
              <Legend />
              <Bar dataKey="tcp" stackId="a" fill="var(--color-blue)" />
              <Bar dataKey="udp" stackId="a" fill="var(--color-purple)" />
              <Bar dataKey="icmp" stackId="a" fill="var(--color-green)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Outlier Detection Scatter Plot */}
      <div className="panel" style={{ gridColumn: 'span 6', minHeight: '350px' }}>
        <h3 className="panel-title">Anomaly Detection (Duration vs Bytes)</h3>
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid stroke="var(--border-color)" />
              <XAxis type="number" dataKey="duration" name="Duration (s)" stroke="var(--text-muted)" />
              <YAxis type="number" dataKey="bytes" name="Bytes" stroke="var(--text-muted)" />
              <ZAxis type="number" range={[20, 100]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ backgroundColor: 'var(--bg-panel)' }} 
                itemStyle={{ color: 'var(--color-green)' }} 
                labelStyle={{ color: 'var(--color-green)' }}
              />
              <Scatter name="Traffic" data={scatterDurationBytes}>
                {scatterDurationBytes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isAnomaly ? 'var(--color-red)' : 'rgba(0, 255, 170, 0.4)'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap Simulation (Bubble Chart) */}
      <div className="panel" style={{ gridColumn: 'span 6', minHeight: '350px' }}>
        <h3 className="panel-title">Source vs Destination Traffic Heatmap</h3>
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid stroke="var(--border-color)" />
              <XAxis type="number" dataKey="srcBytes" name="Source Bytes" stroke="var(--text-muted)" />
              <YAxis type="number" dataKey="dstBytes" name="Dest Bytes" stroke="var(--text-muted)" />
              <ZAxis type="number" dataKey="z" range={[50, 400]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ backgroundColor: 'var(--bg-panel)' }} 
                itemStyle={{ color: 'var(--color-green)' }} 
                labelStyle={{ color: 'var(--color-green)' }}
              />
              <Scatter data={heatmapData}>
                {heatmapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.type === 'anomaly' ? 'var(--color-yellow)' : 'rgba(0, 204, 255, 0.5)'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="panel" style={{ gridColumn: 'span 12', overflowX: 'auto' }}>
        <h3 className="panel-title">Top Suspicious Connections</h3>
        <table className="cyber-table">
          <thead>
            <tr>
              <th>Connection ID</th>
              <th>Protocol</th>
              <th>Service</th>
              <th>Bytes</th>
              <th>Flag</th>
              <th>Risk Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredConnections.map((conn) => (
              <tr key={conn.id}>
                <td style={{ fontFamily: 'monospace' }}>{conn.id}</td>
                <td>{conn.protocol}</td>
                <td>{conn.service}</td>
                <td>{conn.bytes.toLocaleString()}</td>
                <td><span style={{ color: 'var(--color-purple)', fontWeight: 'bold' }}>{conn.flag}</span></td>
                <td>
                  <span className={`badge ${conn.risk.toLowerCase()}`}>
                    {conn.risk}
                  </span>
                </td>
                <td>
                  <button 
                    className="cyber-button" 
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    onClick={() => setInspectingConn(conn)}
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {inspectingConn && (
        <InspectModal 
          connection={inspectingConn} 
          onClose={() => setInspectingConn(null)} 
        />
      )}
    </>
  );
};

export default MainCharts;
