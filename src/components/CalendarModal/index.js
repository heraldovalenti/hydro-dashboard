import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  FormControl,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { StoreContext } from '../../store';
import './styles.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const ModalTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const ModalContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(DialogContent);

const ModalActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(DialogActions);

export default function CalendarModal({ onClose, open }) {
  const {
    startDate: startDate,
    setStartDate: setStartDate,
    counterEndDate: startMaxDate,
    fetchData,
    visitation: visitationData,
    setVisitation: setVisitationData,
    prevPeriodVisitation,
    setPrevPeriodVisitation,
    setPrevPeriodStartDate,
    setPrevPeriodEndDate,
  } = useContext(StoreContext);

  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);

  const saveNewDateRange = () => {
    const prevStartDate = new Date(newStartDate);
    prevStartDate.setFullYear(prevStartDate.getFullYear() - 1);
    const prevEndDate = new Date(newEndDate);
    prevEndDate.setFullYear(prevEndDate.getFullYear() - 1);

    const visitationIndex = visitationData.findIndex(
      (record) => record.recordDate === newStartDate.toISOString().slice(0, 10)
    );
    const prevStartIndex = prevPeriodVisitation.findIndex(
      (record) => record.recordDate === prevStartDate.toISOString().slice(0, 10)
    );
    const prevEndIndex = prevPeriodVisitation.findIndex(
      (record) => record.recordDate === prevEndDate.toISOString().slice(0, 10)
    );

    if (newStartDate <= startMaxDate) {
      setStartDate(newStartDate);
      setPrevPeriodStartDate(prevStartDate);
    }
    if (newEndDate >= endMinDate) {
      setEndDate(newEndDate);
      setPrevPeriodEndDate(prevEndDate);
    }
    if (visitationIndex === -1) {
      // attempt to fetch more data out of initial date range
      fetchData(newStartDate, newEndDate);
    } else {
      if (visitationIndex !== -1)
        setVisitationData(
          visitationData.slice(visitationIndex, visitationData.length)
        );
      if (prevStartIndex !== -1)
        setPrevPeriodVisitation(
          prevPeriodVisitation.slice(
            prevStartIndex,
            prevPeriodVisitation.length
          )
        );
      if (prevEndIndex !== -1)
        setPrevPeriodVisitation(prevPeriodVisitation.slice(0, prevEndIndex));
    }
    onClose();
  };

  const handleStartDateChange = (value) => {
    setNewStartDate(new Date(value));
  };
  const handleEndDateChange = (value) => {
    setNewEndDate(new Date(value));
  };

  return (
    <Dialog
      className="scenario-modal"
      onClose={onClose}
      aria-labelledby="scenario-modal__ttitle"
      open={open}
    >
      <ModalTitle id="scenario-modal__title" onClose={onClose}>
        Time Period Selection
      </ModalTitle>
      <ModalContent dividers>
        <FormControl>
          <p>Select the time period to apply to your simulation:</p>
          <div className="daterange__panel">
            <label className="daterange__label">From</label>
            <KeyboardDatePicker
              variant="inline"
              format="MM/DD/YYYY"
              defaultValue={newStartDate}
              value={newStartDate}
              maxDate={startMaxDate}
              maxDateMessage={`The From date could not be after today's date.`}
              invalidDateMessage={`The From date could not be after today's date.`}
              disableToolbar={true}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="daterange__panel">
            <label className="daterange__label">To</label>
            <KeyboardDatePicker
              variant="inline"
              format="MM/DD/YYYY"
              defaultValue={newEndDate}
              value={newEndDate}
              minDate={endMinDate}
              minDateMessage={`The To date could not be before today's date.`}
              invalidDateMessage={`The To date could not be before today's date.`}
              disableToolbar={true}
              onChange={handleEndDateChange}
            />
          </div>
        </FormControl>
      </ModalContent>
      <ModalActions>
        <Button autoFocus onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          autoFocus
          onClick={saveNewDateRange}
          color="primary"
          variant="contained"
        >
          Ok
        </Button>
      </ModalActions>
    </Dialog>
  );
}
