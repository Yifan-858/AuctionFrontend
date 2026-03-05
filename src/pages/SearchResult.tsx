import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAuctionsByTitle } from "../services/auctionService";
import type { Auction } from "../types/Auction";
import AuctionDisplayCards from "../components/AuctionDisplayCards";
import Navbar from "../components/Navbar";

type Filter = "all" | "open" | "closed";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("open");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await getAuctionsByTitle(query);
        setAuctions(results);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  const filteredAuctions = auctions.filter((a) => {
    if (filter === "all") return true;
    if (filter === "open") return a.isOpen;
    if (filter === "closed") return !a.isOpen;
    return true;
  });

  if (loading) return <p>Loading results...</p>;

  return (
    <div>
      <Navbar />
      <h2>Search results for "{query}"</h2>
      <div className="filter-buttons" style={{ marginBottom: "1rem" }}>
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
      {filteredAuctions.length > 0 ? (
        <>
          <AuctionDisplayCards auctions={filteredAuctions} />
        </>
      ) : (
        <p>No auctions found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchResults;
