import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'CropGuard AI',
      tagline: 'Maize Disease Detection',
      subtitle: 'Upload a maize leaf photo for instant AI diagnosis',
      uploadTitle: 'Upload Leaf Photo',
      uploadHint: 'Tap to select or drag a photo here',
      uploadFormats: 'JPG, PNG supported',
      diagnose: 'Diagnose',
      diagnosing: 'Analysing...',
      result: 'Diagnosis Result',
      disease: 'Detected Condition',
      confidence: 'Confidence',
      treatment: 'Recommended Treatment',
      severity: 'Severity',
      history: 'Previous Diagnoses',
      noHistory: 'No diagnoses yet. Upload a leaf photo to get started.',
      clearHistory: 'Clear History',
      healthy: 'Healthy',
      tryAnother: 'Diagnose Another',
      poweredBy: 'Powered by MobileNetV2',
      mmuTag: 'Multimedia University of Kenya',
      severityLow: 'Low',
      severityMedium: 'Medium',
      severityHigh: 'High',
      uploadError: 'Please select an image first.',
      diseaseCount: 'Diagnosis',
      diseases: {
        cercospora: 'Cercospora Leaf Spot',
        rust: 'Common Rust',
        blight: 'Northern Leaf Blight',
        healthy: 'Healthy',
      },
      treatments: {
        cercospora:
          'Apply mancozeb or chlorothalonil fungicide. Remove and destroy infected leaves. Ensure adequate plant spacing to improve air circulation. Avoid overhead irrigation.',
        rust: 'Apply triazole-based fungicides (e.g. propiconazole). Begin treatment at first sign of infection. Plant rust-resistant maize varieties in future seasons.',
        blight:
          'Apply strobilurin fungicides at early infection stage. Rotate crops with non-host plants. Remove crop debris after harvest to reduce inoculum.',
        healthy:
          'Your maize plant appears healthy. Continue regular monitoring every 7 days. Maintain soil fertility and adequate irrigation.',
      },
    },
  },
  sw: {
    translation: {
      appName: 'CropGuard AI',
      tagline: 'Ugunduzaji wa Magonjwa ya Mahindi',
      subtitle: 'Pakia picha ya jani la mahindi kwa uchunguzi wa haraka wa AI',
      uploadTitle: 'Pakia Picha ya Jani',
      uploadHint: 'Gonga ili kuchagua au buruta picha hapa',
      uploadFormats: 'JPG, PNG zinakubaliwa',
      diagnose: 'Chunguza',
      diagnosing: 'Inachunguza...',
      result: 'Matokeo ya Uchunguzi',
      disease: 'Hali Iliyogunduliwa',
      confidence: 'Uhakika',
      treatment: 'Matibabu Yanayopendekezwa',
      severity: 'Ukali',
      history: 'Uchunguzi Uliopita',
      noHistory: 'Hakuna uchunguzi bado. Pakia picha ya jani kuanza.',
      clearHistory: 'Futa Historia',
      healthy: 'Yenye Afya',
      tryAnother: 'Chunguza Nyingine',
      poweredBy: 'Inaendeshwa na MobileNetV2',
      mmuTag: 'Chuo Kikuu cha Multimedia Kenya',
      severityLow: 'Chini',
      severityMedium: 'Wastani',
      severityHigh: 'Juu',
      uploadError: 'Tafadhali chagua picha kwanza.',
      diseaseCount: 'Uchunguzi',
      diseases: {
        cercospora: 'Madoa ya Majani (Cercospora)',
        rust: 'Kutu ya Kawaida',
        blight: 'Ugonjwa wa Majani ya Kaskazini',
        healthy: 'Yenye Afya',
      },
      treatments: {
        cercospora:
          'Tumia dawa ya ukungu kama mancozeb au chlorothalonil. Ondoa na uharibu majani yaliyoathirika. Hakikisha nafasi ya kutosha kati ya mimea kuboresha mzunguko wa hewa. Epuka umwagiliaji wa juu.',
        rust: 'Tumia dawa za triazole (k.m. propiconazole). Anza matibabu mapema unapogundua dalili. Panda aina za mahindi zinazostahimili kutu katika misimu ijayo.',
        blight:
          'Tumia dawa za strobilurin katika hatua ya mapema ya maambukizi. Zungusha mazao na mimea isiyoathiriwa. Ondoa mabaki ya mazao baada ya mavuno kupunguza vyanzo vya maambukizi.',
        healthy:
          'Mmea wako wa mahindi unaonekana kuwa na afya. Endelea kufuatilia kila siku 7. Dumisha rutuba ya udongo na umwagiliaji wa kutosha.',
      },
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
