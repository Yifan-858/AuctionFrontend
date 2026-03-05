import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAuctionById } from "../services/auctionService";
import type { Auction } from "../types/Auction";

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        if (!id) return;

        const data = await getAuctionById(Number(id));
        setAuction(data);
      } catch (err) {
        console.error("Failed to load auction:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  if (loading) return <p>Loading auction...</p>;
  if (!auction) return <p>Auction not found</p>;

  const closedAuction = (
    <div className="auction-details">
      <Link to="/">Home</Link>
      <h1>{auction.title}</h1>
      <h4>Description:</h4> {auction.description}
      {auction.soldPrice ? (
        <p>Sold Price: {auction.soldPrice} SEK</p>
      ) : (
        <p>Not Sold</p>
      )}
      <p>
        End Date:
        {new Date(auction.endDateUtc).toLocaleString()}
      </p>
      <p>Seller:{auction.userName}</p>
    </div>
  );

  const openAuction = (
    <div className="auction-details">
      <Link to="/">Home</Link>
      <h1>{auction.title}</h1>
      <h4>Description:</h4> {auction.description}
      <p>Start Price: {auction.startPrice} SEK</p>
      <p>
        Start Date:
        {new Date(auction.startDateUtc).toLocaleString()}
      </p>
      <p>
        End Date:
        {new Date(auction.endDateUtc).toLocaleString()}
      </p>
      <p>Seller:{auction.userName}</p>
    </div>
  );

  return auction.isOpen ? openAuction : closedAuction;
};

export default AuctionDetails;
