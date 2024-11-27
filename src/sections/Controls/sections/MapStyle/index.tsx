import { useCallback, useMemo } from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../../../../components/RadioGroup';
import { useMapStyle } from '../../../../hooks/useMapStyle';

export const MapStyles = () => {
  const { t } = useTranslation();
  const { selectedStyle, mapStyles, updateSelectedStyle } = useMapStyle();

  const styleOptions = useMemo(
    () =>
      mapStyles.map(({ id, name }) => {
        const translation = t(`control_panel_styles_${id}`);
        return { label: translation || name, value: id };
      }),
    [mapStyles, t]
  );

  const loading = useMemo(() => !selectedStyle || !mapStyles, [
    mapStyles,
    selectedStyle,
  ]);

  const handleRadioChange = useCallback(
    (styleOption: string) => {
      updateSelectedStyle(styleOption);
    },
    [updateSelectedStyle]
  );

  return (
    <CollapsiblePanel title={t('control_panel_styles_title')}>
      <div style={{ width: '100%' }} className="control-panel">
        <RadioGroup
          items={styleOptions}
          onChange={handleRadioChange}
          value={selectedStyle}
          disabled={loading}
        />
      </div>
    </CollapsiblePanel>
  );
};
