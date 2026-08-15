import React from 'react';
import '../../styles/boot.css';

function BootProgress({ progress }) {
  return (
    <div className='boot-progress'>
      <div className='progress-track'>
        <div className='progress-fill' style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default BootProgress;
