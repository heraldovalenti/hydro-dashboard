import React, { useContext } from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import { StoreContext } from '../../../../store';
import './styles.css';

export default function Option1() {
  const {} = useContext(StoreContext);

  return (
    <CollapsiblePanel title="Option1" expanded>
      <div style={{ width: '100%' }} className="control-panel">
        <div className="row">
          <div style={{ width: '100%' }} className="label desc">
            Set Option1
          </div>
        </div>
      </div>
    </CollapsiblePanel>
  );
}
