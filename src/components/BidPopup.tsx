import React, { useState } from "react";
import { addBid } from "../services/bidService";
import type { Auction } from "../types/Auction";
import "./Bid.css";

interface BidPopupProps {
  auction: Auction;
  isOpen: boolean;
  onClose: () => void;
  onBidSuccess: (bidAmount: number) => void;
}

const BidPopup: React.FC<BidPopupProps> = ({
  auction,
  isOpen,
  onClose,
  onBidSuccess,
}) => {
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  if (!isOpen) return null;

  const handleBid = async () => {
    try {
      if (auction.startPrice && bidAmount < auction.startPrice) {
        setFeedback(`Your bid must at least equal to startPrice`);
        return;
      }

      if (auction.highestBid && bidAmount <= auction.highestBid) {
        setFeedback(`Your bid must be higher than the highestBid`);
        return;
      }

      await addBid({ auctionId: auction.id, bidAmount });
      setFeedback("Bid placed successfully!");
      onBidSuccess(bidAmount);
      setTimeout(() => {
        setFeedback("");
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setFeedback("Bid failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {auction.highestBid ? (
          <p>Current Highest Bid: {auction.highestBid} SEK</p>
        ) : (
          <p>Start Bid: {auction.startPrice} SEK</p>
        )}

        <input
          className="bid-amount-input"
          type="number"
          min={(auction.highestBid ?? auction.startPrice) + 1}
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          placeholder="Enter your bid"
        />
        <button className="bid-btn" onClick={handleBid}>
          Submit Bid
        </button>
        <button className="bid-btn" onClick={onClose}>
          Cancel
        </button>
        <p>{feedback}</p>
      </div>
    </div>
  );
};

export default BidPopup;
