import React from "react";
import type { Auction } from "../types/Auction";
import { Link } from "react-router-dom";

type AuctionDisplayCardsProps = {
  auctions: Auction[];
};

const AuctionDisplayCards: React.FC<AuctionDisplayCardsProps> = ({
  auctions,
}) => {
  if (!auctions || auctions.length === 0) {
    return <p>No auctions found.</p>;
  }

  return (
    <div
      className="auction-cards-container"
      style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
    >
      {auctions.map((auction) => (
        <div key={auction.id} className="auction-card">
          <h3>{auction.title}</h3>
          <p>
            {auction.description.length > 100
              ? auction.description.slice(0, 100) + "..."
              : auction.description}
          </p>
          <p>
            <strong>Start Price:</strong> ${auction.startPrice.toFixed(2)}
          </p>
          <p>
            <strong>Start:</strong>{" "}
            {new Date(auction.startDateUtc).toLocaleString()}
          </p>
          <p>
            <strong>End:</strong>{" "}
            {new Date(auction.endDateUtc).toLocaleString()}
          </p>
          <Link to={`/auction/${auction.id}`}>View Auction</Link>
        </div>
      ))}
    </div>
  );
};

export default AuctionDisplayCards;
