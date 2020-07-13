import React from 'react';
import './styles.css';
import Option1 from './sections/Option1';

export default function Controls() {
  return (
    <div className="controls">
      <h4 className="controls__title">Controls</h4>
      <Option1 />
    </div>
  );
}
