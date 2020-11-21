import React from 'react';
import './Plant.css';

function Plant() {
  return (
    <div>
      <h1>Plant</h1>
      <div className="sun">
        {['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
          .map((direction) => <div className={`sun-tri ${direction}`} />)}
      </div>
    </div>
  );
}

export default Plant;
