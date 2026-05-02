// ─── CONFIGURATION ───────────────────────────────────────────────
// When your FastAPI / Express backend is ready:
//   1. Create a .env file: VITE_API_URL=https://your-backend.render.com
//   2. Set USE_MOCK = false below
// ─────────────────────────────────────────────────────────────────

import type { DiagnosisResult, DiseaseKey, SeverityKey } from './types';

const USE_MOCK = true;
export const API_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000';

const MOCK_RESPONSES: DiagnosisResult[] = [
  { disease: 'cercospora', confidence: 0.87, severity: 'medium' },
  { disease: 'rust',       confidence: 0.93, severity: 'high'   },
  { disease: 'blight',     confidence: 0.79, severity: 'medium' },
  { disease: 'healthy',    confidence: 0.97, severity: 'low'    },
];

let mockIndex = 0;

export async function diagnoseLeaf(imageFile: File): Promise<DiagnosisResult> {
  if (USE_MOCK) {
    await new Promise<void>((resolve) => setTimeout(resolve, 1800));
    const result = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
    mockIndex++;
    return result;
  }

  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = (await response.json()) as {
    disease: DiseaseKey;
    confidence: number;
    severity: SeverityKey;
  };
  return data;
}
