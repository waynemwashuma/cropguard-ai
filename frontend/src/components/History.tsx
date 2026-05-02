import { useTranslation } from 'react-i18next';
import type { HistoryEntry, SeverityKey } from '../types';

interface HistoryProps {
  history: HistoryEntry[];
  setHistory: (history: HistoryEntry[]) => void;
  onSelect: (item: HistoryEntry) => void;
}

const SEV_COLOR: Record<SeverityKey, string> = {
  low:    '#16A34A',
  medium: '#D97706',
  high:   '#DC2626',
};

export default function History({ history, setHistory, onSelect }: HistoryProps) {
  const { t } = useTranslation();

  if (history.length === 0) {
    return (
      <section className="history-section empty">
        <h3 className="history-title">{t('history')}</h3>
        <div className="history-empty-state">
          <span className="history-empty-icon">📋</span>
          <p className="history-empty">{t('noHistory')}</p>
        </div>
      </section>
    );
  }

  function formatTime(ts: string): string {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <section className="history-section">
      <div className="history-header">
        <h3 className="history-title">
          {t('history')}
          <span className="history-count">{history.length}</span>
        </h3>
        <button className="clear-btn" onClick={() => setHistory([])}>
          {t('clearHistory')}
        </button>
      </div>

      <div className="history-list">
        {history.map((item, i) => (
          <button
            key={i}
            className="history-item"
            onClick={() => onSelect(item)}
            type="button"
          >
            {item.previewUrl ? (
              <img src={item.previewUrl} alt="leaf" className="history-thumb" />
            ) : (
              <div className="history-thumb-placeholder">🌿</div>
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
              <span className="history-arrow">›</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
