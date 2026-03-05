export interface Auction {
  id: number;
  title: string;
  description: string;
  startPrice: number;
  startDateUtc: string;
  endDateUtc: string;

  soldPrice?: number;
  highestBid?: number;

  userId: number;
  userName: string;

  bidCount: number;
  isActive: boolean;
  isOpen: boolean;
}

export interface AuctionCreate {
  id: number;
  title: string;
  description: string;
  startPrice: number;
  startDateUtc: string;
  endDateUtc: string;
}
