import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onLangChange: (lang: string) => void;
  currentLang: string;
}

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' }
];

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Docs', href: '/docs' },
  { label: 'Contact', href: '/contact' }
];

export default function Header({ onLangChange, currentLang }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="header" aria-label={t('appTitle')}>
      <div className="header-left">
        <div className="branding">
          <span className="logo" aria-hidden="true">🌱</span>
          <div>
            <h1 className="app-title">{t('Smart Farm')}</h1>
            <span className="app-subtitle">{t('Farm the digital way')}</span>
          </div>
        </div>
        <nav className="main-nav" aria-label={t('mainNavigation')}>
          <ul>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <a href={item.href}>{t(item.label)}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="header-actions">
        <label className="lang-switcher" aria-label={t('changeLang')}>
          <span className="lang-label">EN</span>
          <input
            type="checkbox"
            checked={currentLang === 'es'}
            onChange={() => onLangChange(currentLang === 'en' ? 'es' : 'en')}
            aria-checked={currentLang === 'es'}
            aria-label={t('changeLang')}
          />
          <span className="slider"></span>
          <span className="lang-label">ES</span>
        </label>
      </div>
    </header>
  );
}
