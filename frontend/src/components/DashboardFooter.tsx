import React, { useState } from "react";
import type { MouseEvent } from "react";
import {
  FaQuestionCircle,
  FaEnvelopeOpenText,
  FaLightbulb,
  FaRegTimesCircle,
  FaSeedling,
  FaLeaf,
  FaTools,
  FaBook,
  FaUserFriends,
} from "react-icons/fa";
import "./DashboardFooter.css";

const DashboardFooter: React.FC = () => {
  const [showTips, setShowTips] = useState(false);

  const handleContact = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "/contact";
  };

  return (
    <div className="footer-bar">
      <div className="footer-bar-inner">
        {/* LEFT: Main info card content */}
        <div className="footer-about">
          <div className="footer-title">
            <FaQuestionCircle style={{ marginRight: 8 }} />
            Need Assistance?
          </div>
          <p>
            <FaLightbulb style={{ marginRight: 4 }} />
            <button className="tips-btn" onClick={() => setShowTips(true)}>
              See top tips for great results
            </button>
          </p>
          <div style={{ margin: "10px 0" }}>
            <button className="contact-btn" onClick={handleContact}>
              <FaEnvelopeOpenText style={{ marginRight: 4 }} />
              Contact Support
            </button>
            <a href="/help" className="info-link" style={{ marginLeft: 14 }}>
              Read our FAQs
            </a>
          </div>
          <p style={{ fontSize: "0.95rem", color: "#7b8944", marginTop: 12 }}>
            <strong>Disclaimer:</strong> This tool is for informational purposes only and does not replace professional medical advice.&nbsp;
            <span role="img" aria-label="medical">⚕️</span>
          </p>
        </div>
        <div className="footer-divider"></div>
        {/* RIGHT: Intro section */}
        <div className="footer-about">
          <div className="footer-title">
            <FaSeedling style={{ marginRight: 8 }} />
            Welcome to <span style={{ color: "#4CAF50" }}>Smart Farm Assistant</span>
          </div>
          <p>
            <FaLeaf style={{ marginRight: 4 }} />
            Your digital companion for thriving crops and healthy farm management! Get expert tips, support, and resources tailored for modern farmers&nbsp;
            <span role="img" aria-label="farm">🌾</span>
          </p>
          <ul style={{ margin: "12px 0 0 0", paddingLeft: "20px" }}>
            <li>
              <FaTools style={{ marginRight: 6 }} />
              <strong> Quick Help:</strong> Browse FAQs or contact our experts.
            </li>
            <li>
              <FaLightbulb style={{ marginRight: 6 }} />
              <strong> Pro Tips:</strong> Unlock productivity & healthy crops.
            </li>
            <li>
              <FaBook style={{ marginRight: 6 }} />
              <strong> Knowledge Base:</strong> All you need in one dashboard.
            </li>
            <li>
              <FaUserFriends style={{ marginRight: 6 }} />
              <strong> Community:</strong> Connect & share with fellow farmers.
            </li>
          </ul>
        </div>
      </div>
      {/* TIPS MODAL */}
      {showTips && (
        <div
          className="tips-modal-backdrop"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={() => setShowTips(false)}
          style={{
            position: "fixed",
            zIndex: 99,
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            className="tips-modal"
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              maxWidth: 320,
              boxShadow: "0 2px 16px rgba(44,68,72,.18)",
              position: "relative"
            }}
          >
            <button className="close-btn" onClick={() => setShowTips(false)} aria-label="Close tips"
              style={{
                position: "absolute",
                top: 8, right: 8,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#888",
                cursor: "pointer"
              }}
            >
              <FaRegTimesCircle />
            </button>
            <h5 style={{ marginTop: 0, marginBottom: 14, fontWeight: 700 }}>Top Tips for Great Results</h5>
            <ul style={{ paddingLeft: 18 }}>
              <li>Use clear, well-lit photos.</li>
              <li>Avoid blurry or dark images.</li>
              <li>Make sure the entire affected area is visible.</li>
              <li>Only one subject (e.g., leaf or spot) per photo for best accuracy.</li>
              <li>If unsure, consult a professional with your image.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardFooter;
