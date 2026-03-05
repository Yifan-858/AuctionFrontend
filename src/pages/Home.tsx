import { useEffect, useState } from "react";
import { getAllAuctions } from "../services/auctionService";
import AuctionDisplayCards from "../components/AuctionDisplayCards";
import type { Auction } from "../types/Auction";
import Navbar from "../components/Navbar";

const Home = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <AuctionDisplayCards auctions={auctions} />
    </div>
  );
};

export default Home;
