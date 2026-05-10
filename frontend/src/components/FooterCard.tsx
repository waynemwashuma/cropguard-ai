import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaRegCopyright,
  FaRegClock,
  FaHeadset,
  FaStar,
  FaAward,
  FaApple,
  FaGooglePlay,
  FaQuestionCircle,
} from "react-icons/fa";
import "../footer.css";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 2000);
  };

  return (
    <footer className="footer-bar">
      <div className="footer-bar-inner">
        {/* About + Contact */}
        <div className="footer-about">
          <div className="footer-title">About Us</div>
          <div>
            DashboardPro helps you stay organized and achieve more. Our team is dedicated to giving you secure, agile, and intuitive tools to manage your data and tasks.
            <br />
            <span>Reach out to us anytime—we’re here to help!</span>
          </div>
          <div className="footer-contact">
            <div>
              <FaEnvelope />{" "}
              <a href="mailto:support@dashboardpro.com">
                support@dashboardpro.com
              </a>
            </div>
            <div>
              <FaPhone /> <a href="tel:+254793007266">+ 254 793007266</a>
            </div>
            <div>
              <FaMapMarkerAlt /> 1234 Market St, Narobi, Ke
            </div>
            <div>
              <FaRegClock /> Mon-Fri: 9:00am–6:00pm PT
            </div>
            <div>
              <FaHeadset /> <a href="/support">Live Chat Support</a>
            </div>
            <div>
              <FaQuestionCircle /> <a href="/help">FAQ / Help Center</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Quick Links */}
        <div className="footer-links">
          <div className="footer-title">Quick Links</div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
          </ul>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Trust & Awards */}
        <div className="footer-trust">
          <div className="footer-title">Why Choose Us?</div>
          <div className="footer-trust-badges">
            <span>
              <FaAward /> Award-winning support
            </span>
            <span>
              <FaStar /> Trusted by 5,000+ users
            </span>
          </div>
          <div className="footer-trust-testimonials">
            <em>"DashboardPro transformed our workflow!"</em>
            <br />
            <small>– Alex P., Tech Lead</small>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Newsletter */}
        <div className="footer-newsletter">
          <div className="footer-title">Stay Updated</div>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={subscribed}
            />
            <button type="submit" disabled={subscribed}>
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
          <label className="footer-newsletter-desc">
            <input type="checkbox" required style={{ marginRight: 4 }} /> I agree to receive emails from DashboardPro. Read our <a href="/privacy">Privacy Policy</a>.
          </label>
        </div>

        {/* Social & App Links */}
        <div className="footer-social-app">
          <div className="footer-social" aria-label="Social Media Links">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
          <div className="footer-app-links">
            <a href="#" aria-label="Apple App Store"><FaApple /> App Store</a>
            <a href="#" aria-label="Google Play"><FaGooglePlay /> Google Play</a>
          </div>
        </div>

        {/* Map */}
        <div className="footer-map">
          <iframe
            title="DashboardPro Office Map"
            src="https://maps.google.com/maps?q=1234%20Market%20St%2C%20San%20Francisco%2C%20CA&t=&z=13&ie=UTF8&iwloc=&output=embed"
            style={{
              border: 0,
              width: "100%",
              height: 80,
              borderRadius: 10,
              marginTop: 8
            }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <span>
          <FaRegCopyright /> {new Date().getFullYear()} DashboardPro. All rights reserved.
        </span>
        <span className="footer-legal-links">
          <a href="/privacy">Privacy</a>
          {" | "}
          <a href="/terms">Terms</a>
          {" | "}
          <a href="/cookies">Cookies</a>
          {" | "}
          <a href="/accessibility">Accessibility</a>
          {" | "}
          <a href="/gdpr">GDPR</a>
        </span>
      </div>
      <div className="footer-accessibility">
        This site is fully accessible. Need help? <a href="/accessibility">Visit our accessibility page</a>.
      </div>
    </footer>
  );
};

export default Footer;
