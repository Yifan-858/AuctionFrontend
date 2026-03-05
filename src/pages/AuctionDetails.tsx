import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, Link } from "react-router-dom";
import { getAuctionById } from "../services/auctionService";
import type { Auction } from "../types/Auction";
import BidPopup from "../components/BidPopup";
import BidHistory from "../components/BidHistory";
import type { Bid } from "../types/Bid";
import { getBidsByAuction } from "../services/bidService";

const AuctionDetails = () => {
  const { id } = useParams();
  const userContext = useContext(UserContext);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBidOpen, setIsBidOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [bids, setBids] = useState<Bid[]>([]);

  const currentUserId = userContext?.user?.id;
  const isOwner = currentUserId == auction?.userId;

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        if (!id) return;

        const data = await getAuctionById(Number(id));
        setAuction(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to load auction:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id, isBidOpen]);

  const handleBidClick = () => {
    setIsBidOpen(true);
  };

  const handleViewHistory = async () => {
    if (!auction) return;
    const data = await getBidsByAuction(auction.id);
    setBids(data);
    setIsHistoryOpen(true);
  };

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
      {auction.highestBid ? (
        <>
          <p>Current Bid: {auction.highestBid} SEK</p>
          <button onClick={handleViewHistory}>See Bids</button>
        </>
      ) : (
        <p>Start Price: {auction.startPrice} SEK</p>
      )}
      {isOwner ? (
        <button className="bid-btn">Owner cannot bid</button>
      ) : (
        <button className="bid-btn" onClick={handleBidClick}>
          Place a bit
        </button>
      )}
      <p>
        End Date:
        {new Date(auction.endDateUtc).toLocaleString()}
      </p>
      <p>Seller:{auction.userName}</p>
      <BidPopup
        auction={auction}
        isOpen={isBidOpen}
        onClose={() => setIsBidOpen(false)}
        onBidSuccess={(amount) => console.log("Bid placed:", amount)}
      />
      <BidHistory
        bids={bids}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );

  return auction.isOpen ? openAuction : closedAuction;
};

export default AuctionDetails;
