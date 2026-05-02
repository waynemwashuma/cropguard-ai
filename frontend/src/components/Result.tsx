import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { DiagnosisResult, DiseaseKey, SeverityKey } from '../types';

interface ResultProps {
  result: DiagnosisResult;
  preview: string;
  onReset: () => void;
}

const SEVERITY_CONFIG: Record<SeverityKey, { color: string; bg: string; label: string }> = {
  low:    { color: '#166534', bg: '#DCFCE7', label: 'Low Risk'    },
  medium: { color: '#92400E', bg: '#FEF3C7', label: 'Moderate Risk' },
  high:   { color: '#991B1B', bg: '#FEE2E2', label: 'High Risk'   },
};

const DISEASE_CONFIG: Record<DiseaseKey, { emoji: string; accentColor: string }> = {
  cercospora: { emoji: '🔵', accentColor: '#1D4ED8' },
  rust:       { emoji: '🟠', accentColor: '#C2410C' },
  blight:     { emoji: '🟤', accentColor: '#78350F' },
  healthy:    { emoji: '🟢', accentColor: '#15803D' },
};

export default function Result({ result, preview, onReset }: ResultProps) {
  const { t } = useTranslation();
  const { disease, confidence, severity } = result;
  const pct = Math.round((confidence ?? 0) * 100);
  const isHealthy = disease === 'healthy';
  const sevConfig = SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.medium;
  const diseaseConfig = DISEASE_CONFIG[disease] ?? DISEASE_CONFIG.healthy;

  // Animate confidence bar on mount
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <section className="result-section">
      <div className={`result-card ${isHealthy ? 'result-healthy' : 'result-disease'}`}>

        {/* Accent stripe */}
        <div
          className="result-accent"
          style={{ background: isHealthy
            ? 'linear-gradient(135deg, #15803D, #22C55E)'
            : 'linear-gradient(135deg, #D97706, #EF4444)' }}
        />

        <div className="result-body">

          {/* Image panel */}
          {preview && (
            <div className="result-img-panel">
              <img src={preview} alt="diagnosed leaf" className="result-img" />
              <div className="result-img-badge">
                <span>{diseaseConfig.emoji}</span>
              </div>
            </div>
          )}

          {/* Info panel */}
          <div className="result-info">

            {/* Disease name */}
            <div className="disease-header">
              <span className="disease-emoji">{diseaseConfig.emoji}</span>
              <div>
                <p className="result-label">{t('disease')}</p>
                <p
                  className="disease-name"
                  style={{ color: diseaseConfig.accentColor }}
                >
                  {t(`diseases.${disease}`)}
                </p>
              </div>
            </div>

            {/* Confidence */}
            <div className="metric-block">
              <div className="metric-header">
                <span className="result-label">{t('confidence')}</span>
                <span className="confidence-pct">{pct}%</span>
              </div>
              <div className="confidence-track">
                <div
                  className="confidence-fill"
                  style={{
                    width: `${barWidth}%`,
                    background: isHealthy
                      ? 'linear-gradient(90deg, #16A34A, #4ADE80)'
                      : 'linear-gradient(90deg, #D97706, #F59E0B)',
                  }}
                />
              </div>
            </div>

            {/* Severity badge */}
            <div className="metric-block">
              <p className="result-label">{t('severity')}</p>
              <span
                className="severity-pill"
                style={{ color: sevConfig.color, background: sevConfig.bg }}
              >
                <span className="severity-dot" style={{ background: sevConfig.color }} />
                {t(`severity${severity.charAt(0).toUpperCase()}${severity.slice(1)}`)}
              </span>
            </div>

            {/* Treatment */}
            <div className="treatment-card">
              <div className="treatment-header">
                <span className="treatment-icon">💊</span>
                <span className="treatment-label">{t('treatment')}</span>
              </div>
              <p className="treatment-text">{t(`treatments.${disease}`)}</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="result-footer">
          <button className="reset-btn" onClick={onReset}>
            <span>↩</span> {t('tryAnother')}
          </button>
        </div>
      </div>
    </section>
  );
}
