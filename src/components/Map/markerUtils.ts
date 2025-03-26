import dropIcon from '../../components/Icons/drop-icon.png';
import levelIcon from '../../components/Icons/level-icon.png';
import './styles.css';

type BuildMarkerArgs = {
  description: string;
  severity: 'neutral' | 'low' | 'medium' | 'high' | 'danger';
  type: 'level' | 'rain';
};
export const buildMarker = ({
  description = '',
  severity = 'neutral',
  type,
}: BuildMarkerArgs) => {
  const container = document.createElement('div');
  container.setAttribute('class', 'markerContainer');
  const icon = document.createElement('img');
  icon.setAttribute('class', 'markerIcon');
  let typeStyle = '';
  if (type === 'level') {
    icon.setAttribute('src', levelIcon);
    typeStyle = 'hydrometricData';
  }
  if (type === 'rain') {
    icon.setAttribute('src', dropIcon);
    typeStyle = 'accumulationData';
  }
  const text = document.createElement('p');
  text.setAttribute('class', `markerText ${typeStyle} ${severity}`);
  text.innerHTML = description;
  container.appendChild(icon);
  container.appendChild(text);
  return container;
};
