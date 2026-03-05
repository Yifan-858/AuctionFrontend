import { API_URL } from "./api";
import type { Bid } from "../types/Bid";

export const addBid = async ({
  auctionId,
  bidAmount,
}: {
  auctionId: number;
  bidAmount: number;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("You must be logged in to bid");

  const response = await fetch(`${API_URL}/bid/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ auctionId, bidAmount }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to place bid");
  }

  return response.json();
};

export const getBidsByAuction = async (auctionId: number): Promise<Bid[]> => {
  const response = await fetch(`${API_URL}/bid/auction/${auctionId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch bids");
  }

  return response.json();
};
