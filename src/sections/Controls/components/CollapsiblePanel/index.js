import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';

const StyledExpansionPanel = withStyles({
  root: {
    borderRadius: '4px',
    border: '1px solid #d5d5d5',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.05)',
  },
})(ExpansionPanel);

const StyledExpansionPanelSummary = withStyles({
  content: {
    margin: '0 !important',
    minHeight: 'unset !important',
  },
  expanded: {
    margin: '0 !important',
    minHeight: 'unset !important',
  },
})(ExpansionPanelSummary);

const StyledExpansionPanelDetails = withStyles({
  root: {
    padding: '16px',
    paddingTop: 0,
  },
})(ExpansionPanelDetails);

export default function CollapsiblePanel({
  expanded = false,
  title,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <StyledExpansionPanel
      className="collapsible--panel"
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
    >
      <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <h4>{title}</h4>
      </StyledExpansionPanelSummary>
      <StyledExpansionPanelDetails>
        <div className="collapsible--panel__content">{children}</div>
      </StyledExpansionPanelDetails>
    </StyledExpansionPanel>
  );
}
