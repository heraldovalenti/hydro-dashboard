import React from 'react';
import BlueSwitch from '../../components/BlueSwitch';

const LayerFilter = ({ checked, onClick, description }) => {
  return (
    <div className="row">
      <div style={{ width: '100%' }} className="label desc">
        <BlueSwitch onClick={onClick} checked={checked} />
        {description}
      </div>
    </div>
  );
};

export default LayerFilter;
