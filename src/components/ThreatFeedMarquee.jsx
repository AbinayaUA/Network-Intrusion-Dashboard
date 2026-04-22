import React from 'react';
import { threatFeed } from '../data/mockData';
import { AlertOctagon } from 'lucide-react';

const ThreatFeedMarquee = () => {
  return (
    <div className="threat-marquee-wrapper">
      <div className="threat-marquee">
        {threatFeed.map((feed, index) => (
          <span key={index} style={{ marginRight: '3rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={16} /> {feed}
          </span>
        ))}
        {/* Duplicate for infinite loop illusion */}
        {threatFeed.map((feed, index) => (
          <span key={`dup-${index}`} style={{ marginRight: '3rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={16} /> {feed}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ThreatFeedMarquee;
