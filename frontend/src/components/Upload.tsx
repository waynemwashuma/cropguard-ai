import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { diagnoseLeaf } from '../api';
import type { DiagnosisResult } from '../types';

interface UploadProps {
  onResult: (result: DiagnosisResult, previewUrl: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function Upload({ onResult, loading, setLoading }: UploadProps) {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [drag, setDrag] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File | undefined | null): void {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }

  function onDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function clearFile(e: React.MouseEvent): void {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    setError('');
  }

  async function handleSubmit(): Promise<void> {
    if (!file) { setError(t('uploadError')); return; }
    setLoading(true);
    setError('');
    try {
      const res = await diagnoseLeaf(file);
      if (res.error) {
        setError(res.error);
        return;
      }

      onResult(res.diagnosis, preview ?? '');
    } catch {
      setError('Diagnosis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="upload-section">
      <div className="upload-heading">
        <h2>{t('uploadTitle')}</h2>
        <p>{t('subtitle')}</p>
      </div>

      <div
        className={[
          'dropzone',
          drag ? 'drag-over' : '',
          preview ? 'has-preview' : '',
        ].filter(Boolean).join(' ')}
        onClick={() => { if (!preview) inputRef.current?.click(); }}
        onDragOver={(e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.click(); }}
      >
        {preview ? (
          <div className="preview-wrap">
            <img src={preview} alt="leaf preview" className="preview-img" />
            <div className="preview-overlay">
              <span className="preview-ready">✓ Ready to diagnose</span>
            </div>
            <button className="preview-clear" onClick={clearFile} aria-label="Remove image">✕</button>
          </div>
        ) : (
          <div className="dropzone-inner">
            <div className="dropzone-icon-wrap">
              <span className="dropzone-icon">📷</span>
              <span className="dropzone-ring" />
            </div>
            <p className="dropzone-hint">{t('uploadHint')}</p>
            <p className="dropzone-formats">{t('uploadFormats')}</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="file-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && (
        <p className="upload-error" role="alert">
          <span className="error-icon">⚠</span> {error}
        </p>
      )}

      <button
        className={`diagnose-btn${loading ? ' loading' : ''}${file ? ' has-file' : ''}`}
        onClick={() => void handleSubmit()}
        disabled={loading}
      >
        {loading ? (
          <span className="btn-loading">
            <span className="spinner" />
            {t('diagnosing')}
          </span>
        ) : (
          <span className="btn-content">
            <span className="btn-icon">🔬</span>
            {t('diagnose')}
          </span>
        )}
      </button>
    </section>
  );
}
