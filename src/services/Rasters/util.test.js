import { parseName } from './util';

describe('parse name verification', () => {
  it('1. parse name test', () => {
    const { day, begin, end, cycle } = parseName(TEST_DATA[0]);
    expect(day).toBe('01');
    expect(begin).toBe('2021-11-15_0600h');
    expect(end).toBe('2021-11-18_0600h');
    expect(cycle).toBe('06');
  });

  it('2. parse name test', () => {
    const { day, begin, end, cycle } = parseName(TEST_DATA[3]);
    expect(day).toBe('01');
    expect(begin).toBe('2021-11-16_0000h');
    expect(end).toBe('NAh');
    expect(cycle).toBe('00');
  });
});

const TEST_DATA = [
  'prcpWRF_dia+01_de_2021-11-15_0600h_a_2021-11-18_0600h_ciclo-06.tif',
  'prcpWRF_dia+01_de_2021-11-15_1200h_a_2021-11-18_1200h_ciclo-12.tif',
  'prcpWRF_dia+01_de_2021-11-15_1800h_a_2021-11-18_1800h_ciclo-18.tif',
  'prcpWRF_dia+01_de_2021-11-16_0000h_a_NAh_ciclo-00.tif',
  'prcpWRF_dia+01_de_2021-11-16_0600h_a_2021-11-19_0600h_ciclo-06.tif',
  'prcpWRF_dia+01_de_2021-11-16_1200h_a_2021-11-19_1200h_ciclo-12.tif',
  'prcpWRF_dia+01_de_2021-11-16_1800h_a_2021-11-19_1800h_ciclo-18.tif',
  'prcpWRF_dia+01_de_2021-11-17_0600h_a_2021-11-20_0600h_ciclo-06.tif',
  'prcpWRF_dia+01_de_2021-11-17_1200h_a_2021-11-20_1200h_ciclo-12.tif',
  'prcpWRF_dia+01_de_2021-11-17_1800h_a_2021-11-20_1800h_ciclo-18.tif',
  'prcpWRF_dia+01_de_2021-11-18_0600h_a_2021-11-21_0600h_ciclo-06.tif',
  'prcpWRF_dia+01_de_2021-11-18_1200h_a_2021-11-21_1200h_ciclo-12.tif',
  'prcpWRF_dia+01_de_2021-11-18_1800h_a_2021-11-21_1800h_ciclo-18.tif',

  'prcpWRF_dia+02_de_2021-11-15_0600h_a_2021-11-18_0600h_ciclo-06.tif',
  'prcpWRF_dia+02_de_2021-11-15_1200h_a_2021-11-18_1200h_ciclo-12.tif',
  'prcpWRF_dia+02_de_2021-11-15_1800h_a_2021-11-18_1800h_ciclo-18.tif',
  'prcpWRF_dia+02_de_2021-11-16_0000h_a_NAh_ciclo-00.tif',
  'prcpWRF_dia+02_de_2021-11-16_0600h_a_2021-11-19_0600h_ciclo-06.tif',
  'prcpWRF_dia+02_de_2021-11-16_1200h_a_2021-11-19_1200h_ciclo-12.tif',
  'prcpWRF_dia+02_de_2021-11-16_1800h_a_2021-11-19_1800h_ciclo-18.tif',
  'prcpWRF_dia+02_de_2021-11-17_0600h_a_2021-11-20_0600h_ciclo-06.tif',
  'prcpWRF_dia+02_de_2021-11-17_1200h_a_2021-11-20_1200h_ciclo-12.tif',
  'prcpWRF_dia+02_de_2021-11-17_1800h_a_2021-11-20_1800h_ciclo-18.tif',
  'prcpWRF_dia+02_de_2021-11-18_0600h_a_2021-11-21_0600h_ciclo-06.tif',
  'prcpWRF_dia+02_de_2021-11-18_1200h_a_2021-11-21_1200h_ciclo-12.tif',
  'prcpWRF_dia+02_de_2021-11-18_1800h_a_2021-11-21_1800h_ciclo-18.tif',

  'prcpWRF_dia+03_de_2021-11-15_0600h_a_2021-11-18_0600h_ciclo-06.tif',
  'prcpWRF_dia+03_de_2021-11-15_1200h_a_2021-11-18_1200h_ciclo-12.tif',
  'prcpWRF_dia+03_de_2021-11-15_1800h_a_2021-11-18_1800h_ciclo-18.tif',
  'prcpWRF_dia+03_de_2021-11-16_0000h_a_NAh_ciclo-00.tif',
  'prcpWRF_dia+03_de_2021-11-16_0600h_a_2021-11-19_0600h_ciclo-06.tif',
  'prcpWRF_dia+03_de_2021-11-16_1200h_a_2021-11-19_1200h_ciclo-12.tif',
  'prcpWRF_dia+03_de_2021-11-16_1800h_a_2021-11-19_1800h_ciclo-18.tif',
  'prcpWRF_dia+03_de_2021-11-17_0600h_a_2021-11-20_0600h_ciclo-06.tif',
  'prcpWRF_dia+03_de_2021-11-17_1200h_a_2021-11-20_1200h_ciclo-12.tif',
  'prcpWRF_dia+03_de_2021-11-17_1800h_a_2021-11-20_1800h_ciclo-18.tif',
  'prcpWRF_dia+03_de_2021-11-18_0600h_a_2021-11-21_0600h_ciclo-06.tif',
  'prcpWRF_dia+03_de_2021-11-18_1200h_a_2021-11-21_1200h_ciclo-12.tif',
  'prcpWRF_dia+03_de_2021-11-18_1800h_a_2021-11-21_1800h_ciclo-18.tif',
];
