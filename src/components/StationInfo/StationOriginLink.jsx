import React from 'react';
import { Link } from '@mui/material';
import {
  buildSdoLink,
  getSdoDescriptorForStation,
  getSdoForDescriptor,
} from '../../utils/stationDataOrigin';
import { useTranslation } from 'react-i18next';

export const StationOriginLink = ({ station }) => {
  const { t } = useTranslation();
  const sdoDescriptor = getSdoDescriptorForStation(station);
  if (!sdoDescriptor) {
    return null;
  }
  const sdo = getSdoForDescriptor(station, sdoDescriptor);
  const originLink = buildSdoLink(station, sdoDescriptor);
  return (
    <Link href={originLink} target="_blank">
      {t('station_info_link_description', {
        origin: sdo.dataOrigin.description,
      })}
    </Link>
  );
};
