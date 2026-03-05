import React from "react";
import type { Auction } from "../../types/Auction";
import { Link } from "react-router-dom";
import "./AuctionDisplayCard.css";

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
    <div className="auction-cards-container">
      {auctions.map((auction) => (
        <div key={auction.id} className="auction-card">
          <h3>{auction.title}</h3>
          {auction.highestBid ? (
            <p className="auction-start-price">
              Curent Bid: {auction.highestBid} SEK
            </p>
          ) : (
            <p className="auction-start-price">
              Start Price: {auction.startPrice} SEK
            </p>
          )}

          <p className="auction-time">
            Start:
            {new Date(auction.startDateUtc).toLocaleString()}
          </p>
          <p className="auction-time">
            End:
            {new Date(auction.endDateUtc).toLocaleString()}
          </p>
          <Link className="view-auction-btn" to={`/auction/${auction.id}`}>
            View Auction
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AuctionDisplayCards;
