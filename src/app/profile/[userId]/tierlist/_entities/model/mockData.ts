import { TierListSummary } from './types';

export const mockTierLists: TierListSummary[] = [
  {
    id: 'sample-tierlist-1',
    userId: 'guest',
    title: '2024년 최고의 애니메이션',
    description: '2024년에 방영된 애니메이션 중 인상깊었던 작품들',
    thumbnail: 'https://picsum.photos/seed/anime1/400/300',
    viewCount: 1250,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: 'sample-tierlist-2',
    userId: 'guest',
    title: '역대 최고의 이세계물',
    description: '이세계 전생/전이 장르 티어표',
    thumbnail: 'https://picsum.photos/seed/anime2/400/300',
    viewCount: 3420,
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-25'),
  },
  {
    id: 'sample-tierlist-3',
    userId: 'guest',
    title: '스포츠 애니 랭킹',
    thumbnail: 'https://picsum.photos/seed/anime3/400/300',
    viewCount: 890,
    createdAt: new Date('2024-10-10'),
    updatedAt: new Date('2024-10-10'),
  },
  {
    id: 'sample-tierlist-4',
    userId: 'guest',
    title: '로맨스 애니 추천',
    description: '설레는 로맨스 애니메이션 모음',
    thumbnail: 'https://picsum.photos/seed/anime4/400/300',
    viewCount: 2100,
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-09-20'),
  },
];
