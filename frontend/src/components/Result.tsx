import React from 'react';
import { useTranslation } from 'react-i18next';
import type { DiagnosisResult } from '../types';

const SEV_COLOR = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#DC2626'
};

interface ResultProps {
  result: DiagnosisResult;
  imageUrl?: string;
  onBack: () => void;
}

export default function Result({ result, imageUrl, onBack }: ResultProps) {
  const { t } = useTranslation();
  return (
    <section className="result-card">
  <button className="result-back" onClick={onBack} aria-label={t('retry')}>
    ‹ {t('retry')}
  </button>
  <div className="result-header">
    {imageUrl && (
      <img
        src={imageUrl}
        alt={t(`diseases.${result.disease}`)}
        className="result-img"
      />
    )}
    <div className="result-info">
      <h2 className="card-heading">
        {t(`diseases.${result.disease}`)}
        <span className="result-confidence">
          {t('confidence')}: {Math.round(result.confidence * 100)}%
        </span>
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span
          className="sev-dot"
          style={{ background: SEV_COLOR[result.severity] }}
        ></span>
        <span className="result-severity">
          {t('severity')}: {result.severity}
        </span>
      </div>
    </div>
  </div>
  <div className="result-description">
    <strong>{t('description')}: </strong>
    {t(`diseaseDescriptions.${result.disease}`)}
  </div>
</section>
  );
}
