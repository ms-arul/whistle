import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaUtensils,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";

export default function CateringPage() {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedChef, setSelectedChef] = useState("");

  const cuisines = [
    {
      name: "South Indian",
      desc: "Traditional meals, dosa, sambar",
      img: "/food/south.jpg",
    },
    {
      name: "North Indian",
      desc: "Paneer, roti, rich gravies",
      img: "/food/north.jpg",
    },
    {
      name: "Chinese",
      desc: "Noodles, fried rice",
      img: "/food/chinese.jpg",
    },
    {
      name: "Continental",
      desc: "Pasta, salads",
      img: "/food/continental.jpg",
    },
  ];

  const chefs = [
    {
      name: "Chef Damu",
      rating: 4.8,
      specialty: "South Indian Expert",
      img: "/chefs/damu.jpg",
    },
    {
      name: "Madampatty Rangaraj",
      rating: 4.9,
      specialty: "Wedding Specialist",
      img: "/chefs/madampatty.jpeg",
    },
    {
      name: "Chef Venkatesh Bhat",
      rating: 4.7,
      specialty: "Multi Cuisine",
      img: "/chefs/bhat.jpeg",
    },
    {
      name: "Chef Sanjeev Kapoor",
      rating: 4.9,
      specialty: "Luxury Dining",
      img: "/chefs/kapoor.jpeg",
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

        <h1 className="title">
          <FaUtensils /> Catering Services
        </h1>

        {/* CUISINES */}
        <div className="section">
          <h2>Select Cuisine</h2>
          <div className="grid">
            {cuisines.map((c, i) => (
              <div
                key={i}
                className={`card ${selectedCuisine === c.name ? "active" : ""}`}
                onClick={() => setSelectedCuisine(c.name)}
              >
                <img src={c.img} alt={c.name} />
                <div className="overlay">
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                </div>
                {selectedCuisine === c.name && <FaCheckCircle className="check" />}
              </div>
            ))}
          </div>
        </div>

        {/* CHEFS */}
        <div className="section">
          <h2>Top Chefs</h2>
          <div className="grid">
            {chefs.map((c, i) => (
              <div
                key={i}
                className={`card ${selectedChef === c.name ? "active" : ""}`}
                onClick={() => setSelectedChef(c.name)}
              >
                <img src={c.img} alt={c.name} />
                <div className="overlay">
                  <h3>{c.name}</h3>
                  <p>{c.specialty}</p>
                  <span className="rating">
                    <FaStar /> {c.rating}
                  </span>
                </div>
                {selectedChef === c.name && <FaCheckCircle className="check" />}
              </div>
            ))}
          </div>
        </div>

        {/* CONFIRM */}
        {selectedCuisine && selectedChef && (
          <div className="confirm">
            <p>
              Selected: <strong>{selectedCuisine}</strong> with{" "}
              <strong>{selectedChef}</strong>
            </p>
            <button onClick={() => alert("Catering Booked!")}>
              Confirm Booking
            </button>
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
        }

        .back-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
        }

        .title {
          text-align: center;
          color: var(--gold);
          margin-bottom: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 15px;
        }

        /* CARD */
        .card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: 0.3s;
        }

        .card img {
          width: 100%;
          height: 140px;
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
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .overlay h3 {
          font-size: 0.9rem;
        }

        .overlay p {
          font-size: 0.7rem;
          opacity: 0.8;
        }

        .rating {
          font-size: 0.75rem;
          color: var(--gold);
        }

        .card.active {
          outline: 2px solid var(--gold);
        }

        .check {
          position: absolute;
          top: 8px;
          right: 8px;
          color: var(--gold);
        }

        .confirm {
          text-align: center;
          margin-top: 20px;
        }

        .confirm button {
          padding: 12px 25px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--gold), #fff);
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}