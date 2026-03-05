import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAuctionById } from "../services/auctionService";
import type { Auction } from "../types/Auction";
import BidPopup from "../components/Bid/BidPopup";
import BidHistory from "../components/Bid/BidHistory";
import type { Bid } from "../types/Bid";
import { getBidsByAuction } from "../services/bidService";
import Navbar from "../components/NavBar/Navbar";

const AuctionDetails = () => {
  const { id } = useParams();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBidOpen, setIsBidOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [bids, setBids] = useState<Bid[]>([]);

  const currentUserId = userContext?.user?.id;
  const isOwner = currentUserId == auction?.userId;

  const token = localStorage.getItem("token");

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
    if (!token) {
      navigate("/signup");
    }
    setIsBidOpen(true);
  };

  const handleViewHistory = async () => {
    if (!token) {
      navigate("/signup");
    }
    if (!auction) return;
    const data = await getBidsByAuction(auction.id);
    setBids(data);
    setIsHistoryOpen(true);
  };

  if (loading) return <p>Loading auction...</p>;
  if (!auction) return <p>Auction not found</p>;

  const closedAuction = (
    <div className="auction-details">
      <Link to="/">◀ Home</Link>
      <p>Seller:{auction.userName}</p>
      <h1>{auction.title}</h1>
      <p className="end-date">
        End Date:
        {new Date(auction.endDateUtc).toLocaleString()}
      </p>
      {auction.soldPrice ? (
        <p className="sold-price">Sold Price: {auction.soldPrice} SEK</p>
      ) : (
        <p className="sold-price">Not Sold</p>
      )}
      <h4>Description:</h4>
      <p>{auction.description}</p>
    </div>
  );

  const openAuction = (
    <div className="auction-details">
      <Link className="home-btn-arrow" to="/">
        ◀ Home
      </Link>
      <p>Seller:{auction.userName}</p>
      <h1>{auction.title}</h1>
      <p className="end-date">
        End Date:
        {new Date(auction.endDateUtc).toLocaleString()}
      </p>
      {auction.highestBid ? (
        <div className="bid-container">
          <div className="bid-detail">
            <p>Current Bids ∙</p>
            <button onClick={handleViewHistory}>See Bids</button>
          </div>
          <p className="highest-bid">{auction.highestBid} SEK</p>
        </div>
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
      <h4>Description:</h4>
      <p>{auction.description}</p>

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

  return (
    <>
      <Navbar />
      {auction.isOpen ? openAuction : closedAuction}
    </>
  );
};

export default AuctionDetails;
