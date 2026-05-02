import { useTranslation } from 'react-i18next';
import type { LangKey } from '../types';

interface HeaderProps {
  lang: LangKey;
  setLang: (lang: LangKey) => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-mark">
          <span className="logo-leaf">🌾</span>
        </div>
        <div className="logo-text">
          <span className="logo-name">{t('appName')}</span>
          <span className="logo-tag">{t('tagline')}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="powered-badge">
          <span className="badge-dot" />
          <span>{t('poweredBy')}</span>
        </div>
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
          aria-label="Toggle language"
        >
          <span className={lang === 'en' ? 'lang-active' : 'lang-inactive'}>EN</span>
          <span className="lang-track">
            <span className={`lang-thumb ${lang === 'sw' ? 'lang-thumb-right' : ''}`} />
          </span>
          <span className={lang === 'sw' ? 'lang-active' : 'lang-inactive'}>SW</span>
        </button>
      </div>
    </header>
  );
}
