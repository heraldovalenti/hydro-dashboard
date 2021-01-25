import React, { useContext } from 'react';
import { getAmericanDateString } from '../../utils/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppDataContext } from '../../providers/AppDataProvider';
import { Tooltip, IconButton } from '@material-ui/core';

import './styles.css';

function HeaderDates({ startDate, endDate }) {
  return (
    <p className="header__date">
      {getAmericanDateString(startDate)} - {getAmericanDateString(endDate)}
    </p>
  );
}

const Header = ({
  title,
  subtitle,
  onSavePlanClick,
  onCalendarClick,
  onDiskClick,
  showDates,
}) => {
  const { fetchStartDate: startDate, fetchEndDate: endDate } = useContext(
    AppDataContext
  );
  const isDatesSet = startDate && endDate;
  let headerDates;
  if (isDatesSet) {
    headerDates = <HeaderDates startDate={startDate} endDate={endDate} />;
  } else {
    headerDates = <p className="header__date">...</p>;
  }
  return (
    <div className="header">
      <h1 className="header__title">{title}</h1>
      <div className="header__buttons">
        {onSavePlanClick && (
          <Tooltip title="Commit plan">
            <IconButton className="header__button" onClick={onSavePlanClick}>
              <FontAwesomeIcon color={'rgb(70, 70, 70)'} icon="paper-plane" />
            </IconButton>
          </Tooltip>
        )}
        {onCalendarClick && (
          <Tooltip title="Select new time period">
            <IconButton className="header__button" onClick={onCalendarClick}>
              <FontAwesomeIcon color={'rgb(70, 70, 70)'} icon="calendar-alt" />
            </IconButton>
          </Tooltip>
        )}
        {onDiskClick && (
          <Tooltip title="Save scenario">
            <IconButton className="header__button" onClick={onDiskClick}>
              <FontAwesomeIcon color={'rgb(70, 70, 70)'} icon="save" />
            </IconButton>
          </Tooltip>
        )}
      </div>
      {subtitle && <p className="header__description">{subtitle}</p>}
      {showDates && headerDates}
    </div>
  );
};

export default Header;
