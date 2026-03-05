export interface Bid {
  id: number;
  bidAmount: number;
  createdAtUtc: string;
  userId: number;
  userName: string;
  auctionId: number;
}
