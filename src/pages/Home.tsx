import { useEffect, useState } from "react";
import { getAllAuctions } from "../services/auctionService";
import AuctionDisplayCards from "../components/AuctionDisplayCards/AuctionDisplayCards";
import type { Auction } from "../types/Auction";
import Navbar from "../components/NavBar/Navbar";
import "./Page.css";

type Filter = "all" | "open" | "closed";

const Home = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("open");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAllAuctions();
        setAuctions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const filteredAuctions = auctions.filter((a) => {
    if (filter === "all") return true;
    if (filter === "open") return a.isOpen;
    if (filter === "closed") return !a.isOpen;
    return true;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="home-container">
      <Navbar />
      <div className="filter-container">
        <p className="filter-title">Status</p>
        <div className="filter-buttons">
          <button
            onClick={() => setFilter("open")}
            className={filter === "open" ? "active-filter-btn" : ""}
          >
            Open
          </button>
          <button
            onClick={() => setFilter("closed")}
            className={filter === "closed" ? "active-filter-btn" : ""}
          >
            Closed
          </button>
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active-filter-btn" : ""}
          >
            All
          </button>
        </div>
      </div>
      <div className="card-container">
        <AuctionDisplayCards auctions={filteredAuctions} />
      </div>
    </div>
  );
};

export default Home;
