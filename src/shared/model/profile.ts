export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  rating: number;
  tierListCount: number;
  favoriteAnime?: string;
  createdAt: Date;
}

export const mockProfile: UserProfile = {
  id: 'mock-user',
  username: 'aniview_user',
  displayName: 'ＡＮＩＶＩＥＷ ＵＳＥＲ',
  avatar: 'https://placehold.co/96x96/f0b91b/ffffff?text=AU',
  rating: 15722,
  tierListCount: 12,
  favoriteAnime: '애니 매니아',
  createdAt: new Date('2025-01-01'),
};
