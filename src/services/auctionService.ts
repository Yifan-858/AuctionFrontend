import { API_URL } from "./api";
import type { Auction } from "../types/Auction";
import type { AuctionCreate } from "../types/Auction";

export const createAuction = async (
  auction: AuctionCreate,
): Promise<AuctionCreate> => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("User not logged in");

  const response = await fetch(`${API_URL}/auction/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(auction),
  });

  return response.json();
};

export const getAuctionById = async (id: number): Promise<Auction> => {
  const response = await fetch(`${API_URL}/auction/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch auction");
  }

  return response.json();
};

export const getAllAuctions = async (): Promise<Auction[]> => {
  const response = await fetch(`${API_URL}/auction`);

  if (!response.ok) {
    throw new Error("Failed to fetch auctions");
  }

  return response.json();
};

export const getAuctionsByTitle = async (title: string): Promise<Auction[]> => {
  const response = await fetch(`${API_URL}/auction/search?title=${title}`);

  if (!response.ok) {
    throw new Error("Failed to fetch auctions by title");
  }

  return response.json();
};
