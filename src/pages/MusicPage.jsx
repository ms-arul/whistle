import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  FaMusic,
  FaStar,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import AnimatedBackground from "../components/AnimatedBackground";

export default function MusicPage() {
  const navigate = useNavigate();
  const [selectedDJ, setSelectedDJ] = useState("");
  const [preview, setPreview] = useState(null);

  const djs = [
    {
      name: "DJ Alan Walker",
      specialty: "EDM & Festival Beats",
      rating: 4.9,
      img: "/djs/alan.jpg",
    },
    {
      name: "DJ Martin Garrix",
      specialty: "Club & Party Hits",
      rating: 4.8,
      img: "/djs/martin.jpg",
    },
    {
      name: "DJ Anirudh",
      specialty: "Tamil Party & Live",
      rating: 4.9,
      img: "/djs/anirudh.jpg",
    },
    {
      name: "DJ Yuvan",
      specialty: "Melody & Mix",
      rating: 4.7,
      img: "/djs/yuvan.jpg",
    },
  ];

  return (
    <>
      <AnimatedBackground />

      <div className="page">

        {/* BACK */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        {/* TITLE */}
        <h1 className="title">
          <FaMusic /> Music & DJ
        </h1>

        {/* GRID */}
        <div className="grid">
          {djs.map((dj, i) => (
            <div
              key={i}
              className={`card ${selectedDJ === dj.name ? "active" : ""}`}
              onClick={() => setSelectedDJ(dj.name)}
            >
              <img
                src={dj.img}
                alt={dj.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(dj);
                }}
              />

              <div className="overlay">
                <h3>{dj.name}</h3>
                <p>{dj.specialty}</p>

                <div className="rating">
                  <FaStar /> {dj.rating}
                </div>
              </div>

              {selectedDJ === dj.name && (
                <FaCheckCircle className="check" />
              )}
            </div>
          ))}
        </div>

        {/* CONFIRM */}
        {selectedDJ && (
          <div className="confirm">
            <p>
              Selected DJ: <strong>{selectedDJ}</strong>
            </p>
            <button onClick={() => alert("DJ Booked!")}>
              Confirm Booking
            </button>
          </div>
        )}

        {/* PREVIEW MODAL */}
        {preview && (
          <div className="preview-modal" onClick={() => setPreview(null)}>
            <div className="preview-box" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setPreview(null)}>
                <FaTimes />
              </button>

              <img src={preview.img} alt={preview.name} />
              <h3>{preview.name}</h3>
              <p>{preview.specialty}</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        :root {
          --gold: #f5c77a;
          --bg: #06060b;
          --violet: #2b1b55;
          --text: #f5f3ff;
        }

        .page {
          min-height: 100vh;
          padding: 80px 20px;
          color: var(--text);
          position: relative;
          z-index: 1;
        }

        .back-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        .title {
          text-align: center;
          color: var(--gold);
          margin-bottom: 25px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 18px;
        }

        /* CARD */
        .card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition: 0.3s;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
        }

        .card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 10px 30px rgba(245,199,122,0.3);
        }

        .card.active {
          outline: 2px solid var(--gold);
          transform: scale(1.05);
        }

        .card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          transition: 0.4s;
        }

        .card:hover img {
          transform: scale(1.1);
        }

        /* OVERLAY */
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .overlay h3 {
          font-size: 1rem;
        }

        .overlay p {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .rating {
          display: flex;
          gap: 5px;
          font-size: 0.75rem;
          color: var(--gold);
          margin-top: 4px;
        }

        .check {
          position: absolute;
          top: 10px;
          right: 10px;
          color: var(--gold);
        }

        /* CONFIRM */
        .confirm {
          text-align: center;
          margin-top: 25px;
        }

        .confirm button {
          margin-top: 10px;
          padding: 12px 25px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, var(--gold), #fff);
          color: black;
          font-weight: 600;
          cursor: pointer;
        }

        /* MODAL */
        .preview-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .preview-box {
          background: rgba(255,255,255,0.05);
          padding: 20px;
          border-radius: 20px;
          text-align: center;
          max-width: 300px;
        }

        .preview-box img {
          width: 100%;
          border-radius: 12px;
          margin-bottom: 10px;
        }

        .preview-box button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}