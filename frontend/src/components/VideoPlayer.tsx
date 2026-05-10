import React from 'react';
import { useTranslation } from 'react-i18next';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onClose?: () => void;
  selected?: boolean; // Optional: highlight when selected
}

function isYouTubeUrl(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

export default function VideoPlayer({ videoUrl, title, onClose, selected }: VideoPlayerProps) {
  const { t } = useTranslation();
  return (
    <section
      className={`video-player-card${selected ? ' selected' : ''}`}
      tabIndex={0}
      aria-label={title}
    >
      <div className="video-header">
        <h1 className="video-title">{title}</h1>
        {onClose && (
          <button className="video-close-btn" onClick={onClose} aria-label={t('close')}>
            ✖
          </button>
        )}
      </div>
      <div className="video-frame-wrapper">
        {isYouTubeUrl(videoUrl) ? (
          <iframe
            title={title}
            src={videoUrl}
            className="video-content"
            width="100%"
            height="220"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            controls
            loop
            src={videoUrl}
            className="video-content"
            aria-label={title}
          />
        )}
      </div>
      <span className="video-label">{t('Educational Videos')}</span>
    </section>
  );
}
