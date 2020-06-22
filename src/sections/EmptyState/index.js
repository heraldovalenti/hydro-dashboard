import React from 'react';
import { Button } from '@material-ui/core';

import './styles.css';

export default function EmptyState(props) {
  return (
    <div className="empty-state">
      {props.icon && <div className="empty-state__icon">{props.icon}</div>}
      {props.image && <div className="empty-state__image">{props.image}</div>}
      {props.title && <h1 className="empty-state__title">{props.title}</h1>}
      {props.subtitle && (
        <p className="empty-state__subtitle">{props.subtitle}</p>
      )}
      <div className="empty-state__actions">
        {props.primaryActions.map((action) => (
          <Button {...action}>{action.text}</Button>
        ))}
        {props.secondaryActions.map((action) => (
          <Button {...action}>{action.text}</Button>
        ))}
      </div>
    </div>
  );
}

EmptyState.defaultProps = {
  primaryActions: [],
  secondaryActions: [],
};
