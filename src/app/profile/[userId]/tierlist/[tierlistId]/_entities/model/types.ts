export type TierLevel = 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

export interface Anime {
  id: string;
  title: string;
  titleJa?: string;
  thumbnail: string;
  year?: number;
  season?: string;
}

export interface TierListItem {
  tier: TierLevel;
  animes: Anime[];
}

export interface TierListData {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  tiers: TierListItem[];
  isPublic: boolean;
  viewCount: number;
}
