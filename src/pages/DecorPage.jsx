import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  FaPalette,
  FaCheckCircle,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import AnimatedBackground from "../components/AnimatedBackground";

export default function DecorPage() {
  const navigate = useNavigate();
  const [selectedDecor, setSelectedDecor] = useState("");
  const [preview, setPreview] = useState(null);

  const decors = [
    {
      name: "Stage Setup",
      desc: "Grand stage with lighting & backdrop",
      img: "/decor/stage.jpg",
      rating: 4.8,
    },
    {
      name: "Lighting",
      desc: "LED lights, ambience glow",
      img: "/decor/lighting.jpg",
      rating: 4.7,
    },
    {
      name: "Floral Theme",
      desc: "Fresh flowers & elegant setup",
      img: "/decor/floral.jpg",
      rating: 4.9,
    },
    {
      name: "Luxury Decor",
      desc: "Premium royal style design",
      img: "/decor/luxury.jpeg",
      rating: 5.0,
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
          <FaPalette /> Decorations
        </h1>

        {/* GRID */}
        <div className="grid">
          {decors.map((d, i) => (
            <div
              key={i}
              className={`card ${selectedDecor === d.name ? "active" : ""}`}
              onClick={() => setSelectedDecor(d.name)}
            >
              <img
                src={d.img}
                alt={d.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(d);
                }}
              />

              <div className="overlay">
                <h3>{d.name}</h3>
                <p>{d.desc}</p>

                <div className="rating">
                  <FaStar /> {d.rating}
                </div>
              </div>

              {selectedDecor === d.name && (
                <FaCheckCircle className="check" />
              )}
            </div>
          ))}
        </div>

        {/* CONFIRM */}
        {selectedDecor && (
          <div className="confirm">
            <p>
              Selected: <strong>{selectedDecor}</strong>
            </p>
            <button onClick={() => alert("Decor Booked!")}>
              Confirm Selection
            </button>
          </div>
        )}

        {/* 🔍 IMAGE PREVIEW MODAL */}
        {preview && (
          <div className="preview-modal" onClick={() => setPreview(null)}>
            <div className="preview-box" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setPreview(null)}>
                <FaTimes />
              </button>
              <img src={preview.img} alt={preview.name} />
              <h3>{preview.name}</h3>
              <p>{preview.desc}</p>
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
          transition: 0.3s;
        }

        .back-btn:hover {
          transform: scale(1.05);
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
          align-items: center;
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
          font-size: 18px;
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

        /* PREVIEW MODAL */
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