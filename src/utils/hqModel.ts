import { Observation } from '../model';

export const HQOservation = ({
  h,
  q,
  precision = 2,
}: {
  h?: Observation;
  q?: Observation;
  precision?: number;
}) => {
  if (!h && !q) return '';
  const hText = h ? `H:${h.value.toFixed(precision)}` : '',
    qText = q ? `Q:${q.value.toFixed(precision)}` : '';
  if (!hText) return qText;
  else if (!qText) return hText;
  else return `${hText} ${qText}`;
};
