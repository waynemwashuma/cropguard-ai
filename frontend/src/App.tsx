import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Upload from "./components/Upload";
import Result from "./components/Result";
import History from "./components/History";
import VideoPlayer from "./components/VideoPlayer";
import DashboardFooter from "./components/DashboardFooter";
import Footer from "./components/FooterCard"; // Ensure the filename matches
import { diagnoseLeaf } from "./api";
import type { DiagnosisResult, HistoryEntry } from "./types";
import "./App.css";
import "./footer.css";


const VIDEO_MAP: Record<string, { url: string; title: string }> = {
  local: { url: "/crop.mp4", title: "Plant Disease Management" },
  cercospora: { url: "/cercospora.mp4", title: "Grey Leaf Spot Prevention" },
  rust: { url: "/rust.mp4", title: "Rust Prevention" },
  blight: { url: "/blight.mp4", title: "Blight Prevention" },
};

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const videoEntries = Object.entries(VIDEO_MAP);
  const [selectedVideoKey, setSelectedVideoKey] = useState(videoEntries[0][0]);
  const selectedVideo = VIDEO_MAP[selectedVideoKey];

  const handleUpload = (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const previewUrl = e.target?.result as string;
      setUploadedImg(previewUrl);

      try {
        const res = await diagnoseLeaf(file);
        setLoading(false);
        if (res.error) {
          setError(res.error);
          return;
        }
        if (res.diagnosis) {
          setResult(res.diagnosis);
          setHistory([
            {
              ...res.diagnosis,
              timestamp: new Date().toISOString(),
              previewUrl: previewUrl,
            },
            ...history,
          ]);
        }
      } catch (err) {
        setLoading(false);
        setError("Unexpected error, please try again.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHistorySelect = (entry: HistoryEntry) => {
    setResult(entry);
    setUploadedImg(entry.previewUrl ?? null);
  };

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="app-container">
      <Header onLangChange={handleLangChange} currentLang={i18n.language} />

      <div className="dashboard-row">
        <Upload onUpload={handleUpload} loading={loading} error={error} />

        <Result
          result={
            result ?? {
              disease: "healthy",
              confidence: 0,
              severity: "low",
            }
          }
          imageUrl={uploadedImg ?? undefined}
          onBack={() => {
            setResult(null);
            setUploadedImg(null);
          }}
        />

        <History
          history={history}
          onSelect={handleHistorySelect}
          onClear={() => setHistory([])}
        />

        <div>
          <h3 style={{ marginLeft: "16px", marginBottom: 12 }}>
            {i18n.t("educationalVideos")}
          </h3>
          <select
            value={selectedVideoKey}
            onChange={(e) => setSelectedVideoKey(e.target.value)}
            style={{
              margin: "0 0 18px 16px",
              padding: "7px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              display: "block",
            }}
          >
            {videoEntries.map(([key, video]) => (
              <option key={key} value={key}>
                {video.title}
              </option>
            ))}
          </select>
          <VideoPlayer
            videoUrl={selectedVideo.url}
            title={selectedVideo.title}
          />
        </div>
      </div>

      {/* --- DashboardFooter is now below all dashboard components --- */}
      <DashboardFooter />

      {/* Universal footer for the app */}
      <Footer />
    </div>
  );
};

export default App;
