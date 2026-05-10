import React from 'react';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry, SeverityKey } from '../types';

const SEV_COLOR: Record<SeverityKey, string> = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#DC2626',
};

interface HistoryProps {
  history: HistoryEntry[];
  onSelect: (item: HistoryEntry) => void;
  onClear: () => void;
}

function formatTime(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function History({ history, onSelect, onClear }: HistoryProps) {
  const { t } = useTranslation();

  if (history.length === 0) {
    return (
      <section className="history-section empty">
        <h3>{t('history')}</h3>
        <div className="history-empty">
          <span aria-hidden="true" className="empty-icon">📋</span>
          <p>{t('noHistory')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="history-section">
      <div className="history-header">
        <h3>
          {t('history')}
          <span className="history-count">{history.length}</span>
        </h3>
        <button className="clear-btn" onClick={onClear} aria-label={t('clearHistory')}>
          {t('clearHistory')}
        </button>
      </div>
      <div className="history-list">
        {history.map((item) => (
          <button
            key={item.timestamp}
            className="history-item"
            onClick={() => onSelect(item)}
            type="button"
            aria-label={`${t('prediction')}: ${t(`diseases.${item.disease}`)}`}
            tabIndex={0}
          >
            {item.previewUrl ? (
              <img src={item.previewUrl} alt={t(`diseases.${item.disease}`)} className="history-thumb" />
            ) : (
              <div className="history-thumb-placeholder" aria-hidden="true">🌿</div>
            )}
            <div className="history-info">
              <span className="history-disease">{t(`diseases.${item.disease}`)}</span>
              <span className="history-meta">
                {Math.round((item.confidence ?? 0) * 100)}% · {formatTime(item.timestamp)}
              </span>
            </div>
            <div className="history-right">
              <span
                className="history-sev-dot"
                style={{ background: SEV_COLOR[item.severity] ?? '#888' }}
              />
              <span className="history-arrow" aria-hidden="true">›</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
