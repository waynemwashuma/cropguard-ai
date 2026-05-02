// ── Shared types for CropGuard AI ────────────────────────────────

export type DiseaseKey = 'cercospora' | 'rust' | 'blight' | 'healthy';
export type SeverityKey = 'low' | 'medium' | 'high';
export type LangKey = 'en' | 'sw';

export interface DiagnosisResult {
  disease: DiseaseKey;
  confidence: number;
  severity: SeverityKey;
}

export interface HistoryEntry extends DiagnosisResult {
  previewUrl: string;
  timestamp: string;
}
