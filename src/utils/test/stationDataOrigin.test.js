import {
  getSdoDescriptorForStation,
  buildSdoLink,
  getSdoForDescriptor,
} from '../stationDataOrigin';
import config from '../../config';

describe('SDO utils verification', () => {
  describe('getSdoDescriptorForStation() util verification', () => {
    it('should retrieve WU when is WU station', () => {
      const result = getSdoDescriptorForStation(weatherundergroundStation);
      expect(result).not.toBeUndefined();
      expect(result).toBe(config.constants.sdo.weatherUnderground);
    });
    it('should retrieve SNIH when is SNIH station', () => {
      const result = getSdoDescriptorForStation(snihStation);
      expect(result).not.toBeUndefined();
      expect(result).toBe(config.constants.sdo.SNIH);
    });
    it('should retrieve WL when is WL station', () => {
      const result = getSdoDescriptorForStation(weatherlinkStation);
      expect(result).not.toBeUndefined();
      expect(result).toBe(config.constants.sdo.weatherLink);
    });
    it('should retrieve Aes Ibu when is Aes Ibu station', () => {
      const result = getSdoDescriptorForStation(aesIbuStation);
      expect(result).not.toBeUndefined();
      expect(result).toBe(config.constants.sdo.aesIbu);
    });
    it('should be undefined when is INTA station', () => {
      const result = getSdoDescriptorForStation(intaStation);
      expect(result).toBeUndefined();
    });
  });
  describe('buildSdoLink() util verification', () => {
    it('should build link for weatherlink', () => {
      const sdoDescriptor = config.constants.sdo.weatherLink;
      const result = buildSdoLink(weatherlinkStation, sdoDescriptor);
      const expectedLink = sdoDescriptor.link.replace(
        sdoDescriptor.externalIdPlaceholder,
        weatherlinkStation.stationDataOriginList[0].externalStationId
      );
      expect(result).toBe(expectedLink);
    });
    it('should build link for weather underground', () => {
      const sdoDescriptor = config.constants.sdo.weatherUnderground;
      const result = buildSdoLink(weatherundergroundStation, sdoDescriptor);
      const expectedLink = sdoDescriptor.link.replace(
        sdoDescriptor.externalIdPlaceholder,
        weatherundergroundStation.stationDataOriginList[0].externalStationId
      );
      expect(result).toBe(expectedLink);
    });
    it('should build link for SNIH', () => {
      const sdoDescriptor = config.constants.sdo.SNIH;
      const result = buildSdoLink(snihStation, sdoDescriptor);
      const expectedLink = sdoDescriptor.link;
      expect(result).toBe(expectedLink);
    });
    it('should build link for AesIbu', () => {
      const sdoDescriptor = config.constants.sdo.aesIbu;
      const result = buildSdoLink(aesIbuStation, sdoDescriptor);
      const expectedLink = sdoDescriptor.link;
      expect(result).toBe(expectedLink);
    });
    it('should be empty for INTA station', () => {
      const sdoDescriptor = config.constants.sdo.aesIbu;
      const result = buildSdoLink(intaStation, sdoDescriptor);
      expect(result).toBeUndefined();
    });
  });
  describe('getSdoForDescriptor() util verification', () => {
    it('should return matching SDO for descriptor', () => {
      const result = getSdoForDescriptor(
        weatherlinkStation,
        config.constants.sdo.weatherLink
      );
      expect(result).toBe(weatherlinkStation.stationDataOriginList[0]);
    });
    it('should return empty SDO for non matching descriptor', () => {
      const result = getSdoForDescriptor(
        weatherlinkStation,
        config.constants.sdo.SNIH
      );
      expect(result).toBeUndefined();
    });
  });
});
const weatherundergroundStation = {
  id: 3,
  description: 'UCASAL - Fac. Ingeniería',
  latitude: -24.7404422829,
  longitude: -65.3917714195,
  stationDataOriginList: [
    {
      id: 26,
      externalStationId: 'ISALTA11',
      dimension: {
        id: 3,
        description: 'lluvia',
        preferredUnit: {
          id: 3,
          alias: 'mm',
          description: 'milimetro',
        },
      },
      dataOrigin: {
        id: 2,
        description: 'WeatherUnderground',
      },
      defaultUnit: {
        id: 4,
        alias: 'in',
        description: 'pulgada',
      },
    },
  ],
};
const snihStation = {
  id: 68,
  description: 'SNIH - El Tunal',
  latitude: -25.226666,
  longitude: -64.476944,
  stationDataOriginList: [
    {
      id: 59,
      externalStationId: '10626',
      dimension: {
        id: 1,
        description: 'nivel',
        preferredUnit: {
          id: 2,
          alias: 'm',
          description: 'metro',
        },
      },
      dataOrigin: {
        id: 6,
        description: 'SNIH',
      },
      defaultUnit: {
        id: 2,
        alias: 'm',
        description: 'metro',
      },
    },
    {
      id: 75,
      externalStationId: '',
      dimension: {
        id: 2,
        description: 'caudal',
        preferredUnit: {
          id: 5,
          alias: 'm3/sec',
          description: 'm3/sec',
        },
      },
      dataOrigin: {
        id: 7,
        description: 'HQ_model',
      },
      defaultUnit: {
        id: 5,
        alias: 'm3/sec',
        description: 'm3/sec',
      },
    },
    {
      id: 132,
      externalStationId: '10626',
      dimension: {
        id: 3,
        description: 'lluvia',
        preferredUnit: {
          id: 3,
          alias: 'mm',
          description: 'milimetro',
        },
      },
      dataOrigin: {
        id: 6,
        description: 'SNIH',
      },
      defaultUnit: {
        id: 3,
        alias: 'mm',
        description: 'milimetro',
      },
    },
  ],
};
const weatherlinkStation = {
  id: 87,
  description: 'Weatherlink - EMA Sur - Pampa Energía CTG',
  latitude: -24.6885,
  longitude: -65.0439,
  stationDataOriginList: [
    {
      id: 88,
      externalStationId: '70d018b1-cfae-4ca6-b9b2-598bcd796cb3',
      dimension: {
        id: 3,
        description: 'lluvia',
        preferredUnit: {
          id: 3,
          alias: 'mm',
          description: 'milimetro',
        },
      },
      dataOrigin: {
        id: 8,
        description: 'Weatherlink',
      },
      defaultUnit: {
        id: 4,
        alias: 'in',
        description: 'pulgada',
      },
    },
  ],
};
const aesIbuStation = {
  id: 104,
  description: 'AES (IBU) - Cabra Corral',
  latitude: -25.265,
  longitude: -65.329,
  stationDataOriginList: [
    {
      id: 107,
      externalStationId: 'CCOR_NIVEL',
      dimension: {
        id: 1,
        description: 'nivel',
        preferredUnit: {
          id: 2,
          alias: 'm',
          description: 'metro',
        },
      },
      dataOrigin: {
        id: 9,
        description: 'AesIbu',
      },
      defaultUnit: {
        id: 2,
        alias: 'm',
        description: 'metro',
      },
    },
  ],
};
const intaStation = {
  id: 90,
  description: 'INTA - Santa Victoria Este - EEA Yuto',
  latitude: -22.27,
  longitude: -62.71,
  stationDataOriginList: [
    {
      id: 91,
      externalStationId: '369',
      dimension: {
        id: 3,
        description: 'lluvia',
        preferredUnit: {
          id: 3,
          alias: 'mm',
          description: 'milimetro',
        },
      },
      dataOrigin: {
        id: 3,
        description: 'INTA',
      },
      defaultUnit: {
        id: 3,
        alias: 'mm',
        description: 'milimetro',
      },
    },
  ],
};
