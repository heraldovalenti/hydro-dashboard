import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';

const StyledAccordion = withStyles({
  root: {
    borderRadius: '4px',
    border: '1px solid #d5d5d5',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.05)',
  },
})(Accordion);

const StyledAccordionSummary = withStyles({
  content: {
    margin: '0 !important',
    minHeight: 'unset !important',
  },
  expanded: {
    margin: '0 !important',
    minHeight: 'unset !important',
  },
})(AccordionSummary);

const StyledAccordionDetails = withStyles({
  root: {
    padding: '16px',
    paddingTop: 0,
  },
})(AccordionDetails);

export default function CollapsiblePanel({
  expanded = false,
  title,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <StyledAccordion
      className="collapsible--panel"
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
    >
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h4>{title}</h4>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <div className="collapsible--panel__content">{children}</div>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
}
