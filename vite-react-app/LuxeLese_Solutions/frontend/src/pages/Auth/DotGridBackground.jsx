import React from 'react';
import DotGrid from './DotGrid';

const DotGridBackground = ({ children }) => (
  <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
    <DotGrid
      dotSize={10}
      gap={15}
      baseColor="#5227FF"
      activeColor="#5227FF"
      proximity={120}
      shockRadius={250}
      shockStrength={5}
      resistance={750}
      returnDuration={1.5}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', opacity: 0.7 }}
    />
    {/* Transparent background image above DotGrid */}
    <img 
      src="/background-image.png" 
      alt="background" 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.25,
        zIndex: 2,
        pointerEvents: 'none'
      }}
    />
    <div style={{ position: 'relative', zIndex: 3 }}>
      {children}
    </div>
  </div>
);

export default DotGridBackground;
