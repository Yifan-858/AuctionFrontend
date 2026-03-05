// components/BidHistory.tsx
import React from "react";
import type { Bid } from "../types/Bid";
import "./Bid.css";

interface BidHistoryProps {
  bids: Bid[];
  isOpen: boolean;
  onClose: () => void;
}

const BidHistory: React.FC<BidHistoryProps> = ({ bids, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Bid History</h3>
        {bids.length === 0 ? (
          <p>No bids yet.</p>
        ) : (
          <ul>
            {bids
              .slice()
              .sort((a, b) => b.createdAtUtc.localeCompare(a.createdAtUtc))
              .map((bid) => (
                <li
                  key={bid.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 0",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <span>{bid.userName}</span>
                  <span>{bid.bidAmount} SEK</span>
                  <span>{new Date(bid.createdAtUtc).toLocaleString()}</span>
                </li>
              ))}
          </ul>
        )}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BidHistory;
