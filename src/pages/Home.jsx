import WhistleLogo from "../components/logo";
import { Calendar, Users, Star, Sparkles } from "lucide-react";
import { HiSparkles } from "react-icons/hi2";
import { FaCalendarCheck } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Home() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // 🔒 VALIDATION LOGIC
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // only digits

    if (value.length > 10) return;

    setPhone(value);

    if (value.length === 0) {
      setError("");
    } else if (!/^[6-9]/.test(value)) {
      setError("Invalid - Must start with 6-9");
    } else if (value.length < 10) {
      setError(`Invalid - Need ${10 - value.length} more digits`);
    } else {
      setError("");
    }
  };

  const isValid = phone.length === 10 && /^[6-9]/.test(phone);

  return (
    <>
      <AnimatedBackground />
      <main className="home">
        <section className="hero">
          {/* 🔐 TOP RIGHT BUTTON */}
          <div className="top-auth">
            <button onClick={() => setShowAuth(true)}>
              Sign In
            </button>
          </div>

          <div className="content">
            <WhistleLogo size={200} />

            <h1 className="title">
              Whistle
            </h1>

            <p className="tagline">
              Designed for Life’s <span>Biggest Moments</span>
            </p>

            <button 
              className="primary-btn"
              onClick={() => navigate("/booking")}
            >
              <FaCalendarCheck />
              <span>Book Your Event</span>
            </button>

            {/* FEATURES */}
            <div className="features">
              <div className="feature">
                <Calendar />
                <span>Easy Booking</span>
              </div>
              <div className="feature">
                <Users />
                <span>Trusted Vendors</span>
              </div>
              <div className="feature">
                <Star />
                <span>Premium Events</span>
              </div>
              <div className="feature">
                <Sparkles />
                <span>Memorable Experience</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 🔐 AUTH MODAL */}
      {showAuth && (
        <div className="auth-modal" onClick={() => setShowAuth(false)}>
          <div className="auth-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => {
                setShowAuth(false);
                setShowOtpInput(false);
                setPhone("");
                setError("");
              }}
            >
              <IoClose />
            </button>

            <h2>Welcome Back</h2>
            <p>Sign in to continue your experience</p>

            {/* OTP BUTTON */}
            <button
              className="auth-option otp"
              onClick={() => setShowOtpInput(!showOtpInput)}
            >
              <MdOutlinePhoneIphone />
              <span>Continue with OTP</span>
            </button>

            {/* OTP DROPDOWN */}
            <div className={`otp-box ${showOtpInput ? "active" : ""}`}>
              <div className="phone-input">
                <span className="code">+91</span>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                />
              </div>
              
              {error && <p className="error-text">{error}</p>}

              <button
                className="send-otp"
                disabled={!isValid}
                onClick={() => {
                  if (isValid) {
                    alert(`OTP Sent to +91 ${phone}`);
                    // Here you would typically make an API call to send OTP
                  }
                }}
              >
                Send OTP
              </button>
            </div>

            {/* GOOGLE BUTTON */}
            <button className="auth-option google">
              <FcGoogle />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --black: #06060b;
          --violet-dark: #120b2e;
          --violet-mid: #2b1b55;
          --gold: #f5c77a;
          --gold-soft: #f8d99b;
          --text-main: #f5f3ff;
          --text-muted: #b9b1da;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home {
          height: 100vh;
          width: 100%;
          background: transparent;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }

        /* 🔥 GLASS SIGN IN BUTTON */
        .top-auth {
          position: absolute;
          top: 35px;
          right: 20px;
          z-index: 10;
        }

        .top-auth button {
          padding: 10px 24px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--gold);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(245, 199, 122, 0.15);
        }

        .top-auth button:hover {
          background: rgba(245, 199, 122, 0.15);
          border: 1px solid var(--gold);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(245, 199, 122, 0.4);
        }

        .top-auth button:active {
          transform: scale(0.95);
        }

        .content {
          max-width: 400px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 1s ease;
        }

        .title {
          font-family: "Playfair Display", serif;
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          margin: 20px 0 10px;
          background: linear-gradient(135deg, var(--gold), #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tagline {
          font-size: 1rem;
          margin-bottom: 30px;
          color: var(--text-muted);
        }

        .tagline span {
          color: var(--gold);
          font-weight: 600;
        }

        .primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, var(--gold), var(--gold-soft));
          color: #2b1c0f;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 40px;
          transition: all 0.3s ease;
          width: fit-content;
        }

        .primary-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(245, 199, 122, 0.4);
        }

        .features {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.95rem;
          color: var(--text-main);
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          backdrop-filter: blur(5px);
        }

        .feature svg {
          color: var(--gold);
          width: 20px;
          height: 20px;
        }

        /* MODAL */
        .auth-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .auth-box {
          background: rgba(18, 11, 46, 0.9);
          border: 1px solid rgba(245, 199, 122, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 35px 30px;
          border-radius: 24px;
          width: 340px;
          text-align: center;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .auth-box h2 {
          color: var(--gold);
          margin-bottom: 8px;
          font-size: 1.8rem;
        }

        .auth-box p {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 25px;
        }

        .auth-option {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px;
          margin-bottom: 12px;
          border-radius: 999px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .auth-option svg {
          font-size: 20px;
        }

        .auth-option.otp {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--gold);
          color: var(--gold);
        }

        .auth-option.otp:hover {
          background: rgba(245, 199, 122, 0.15);
          transform: translateY(-2px);
        }

        .auth-option.google {
          background: white;
          color: #333;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .auth-option.google:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
        }

        .otp-box {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
          opacity: 0;
        }

        .otp-box.active {
          max-height: 180px;
          margin-bottom: 15px;
          opacity: 1;
        }

        .phone-input {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 8px;
          border: 1px solid rgba(245, 199, 122, 0.2);
        }

        .code {
          color: var(--gold);
          margin-right: 8px;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .phone-input input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          width: 100%;
          font-size: 0.95rem;
        }

        .phone-input input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .error-text {
          color: #ff6b6b;
          font-size: 0.8rem;
          text-align: left;
          margin: 5px 0 10px;
          padding-left: 5px;
        }

        .send-otp {
          width: 100%;
          padding: 12px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, var(--gold), var(--gold-soft));
          color: #2b1c0f;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .send-otp:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(245, 199, 122, 0.4);
        }

        .send-otp:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: var(--gold);
          font-size: 24px;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(245, 199, 122, 0.2);
          transform: rotate(90deg);
        }

        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </>
  );
}