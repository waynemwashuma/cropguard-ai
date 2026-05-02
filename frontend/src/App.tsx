import './i18n';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Upload from './components/Upload';
import Result from './components/Result';
import History from './components/History';
import type { DiagnosisResult, HistoryEntry, LangKey } from './types';
import './App.css';

const HISTORY_KEY = 'cg_history';

function loadHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]') as HistoryEntry[];
  } catch {
    return [];
  }
}

export default function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<LangKey>('en');
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);

  useEffect(() => { void i18n.changeLanguage(lang); }, [lang, i18n]);
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  function handleResult(res: DiagnosisResult, previewUrl: string): void {
    setResult(res);
    setPreview(previewUrl);
    setHistory((prev) => [
      { ...res, previewUrl, timestamp: new Date().toISOString() },
      ...prev.slice(0, 19),
    ]);
  }

  function handleReset(): void {
    setResult(null);
    setPreview('');
  }

  function handleHistorySelect(item: HistoryEntry): void {
    setResult(item);
    setPreview(item.previewUrl);
  }

  return (
    <div className="app">
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-mesh"  aria-hidden="true" />

      <Header lang={lang} setLang={setLang} />

      <main className="main">
        {result === null ? (
          <Upload
            onResult={handleResult}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <Result result={result} preview={preview} onReset={handleReset} />
        )}

        <History
          history={history}
          setHistory={setHistory}
          onSelect={handleHistorySelect}
        />
      </main>

      <footer className="app-footer">
        <span>🌾 CropGuard AI</span>
        <span className="footer-sep">·</span>
        <span>Multimedia University of Kenya</span>
      </footer>
    </div>
  );
}
