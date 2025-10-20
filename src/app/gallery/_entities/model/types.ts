export interface TierListSummary {
  id: string;
  userId: string;
  authorName: string;
  title: string;
  description?: string;
  thumbnail: string;
  viewCount: number;
  createdAt: Date;
  animeCount: number;
}
