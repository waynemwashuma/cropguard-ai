import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UploadProps {
  onUpload: (file: File) => void;
  loading: boolean;
  error: string | null;
}

export default function Upload({ onUpload, loading, error }: UploadProps) {
  const { t } = useTranslation();
  const fileInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setLocalError(t('error') + ': ' + t('invalidFileType'));
      return;
    }
    setLocalError(null);
    setFile(file);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <section className="upload-section" aria-label={t('uploadLabel')}>
      <div
        className="upload-drop"
        tabIndex={0}
        aria-label={t('drag')}
        onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }}
        onDrop={onDrop}
        onClick={() => fileInput.current?.click()}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') fileInput.current?.click();
        }}
      >
        {preview ? (
          <img src={preview} alt={t('uploadLabel')} className="upload-preview" />
        ) : (
          <span className="upload-placeholder" aria-hidden="true">🖼️</span>
        )}
        <span className="upload-label">{t('drag')}</span>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={onInputChange}
        />
      </div>
      {(localError || error) && (
        <div className="upload-error" role="alert">
          {localError || error}
        </div>
      )}
      <button
        className="diagnose-btn"
        onClick={() => file && onUpload(file)}
        disabled={!file || loading}
        aria-label={t('diagnose')}
      >
        {loading ? <span className="loading-indicator">{t('loading')}</span> : t('diagnose')}
      </button>
    </section>
  );
}
