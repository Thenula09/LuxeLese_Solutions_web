import React from 'react';
import DotGrid from './DotGrid';

const DotGridBackground = ({ children }) => (
  <div style={{ 
    width: '100%', 
    height: '100vh', 
    position: 'relative', 
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
  }}>
    <DotGrid
      dotSize={12}
      gap={20}
      baseColor="#FF8C00"
      activeColor="#FFB84D"
      proximity={150}
      shockRadius={300}
      shockStrength={8}
      resistance={500}
      returnDuration={2}
      speedTrigger={80}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1, 
        pointerEvents: 'none', 
        opacity: 0.4,
        filter: 'blur(1px)'
      }}
    />
    <div style={{ position: 'relative', zIndex: 3 }}>
      {children}
    </div>
  </div>
);

export default DotGridBackground;
