import { TierListData } from './types';

export const mockTierListData: TierListData = {
  id: 'sample-tierlist-1',
  userId: 'guest',
  authorName: 'Guest User',
  title: '2024년 최고의 애니메이션',
  description: '개인적으로 선정한 2024년 최고의 애니메이션 작품들',
  createdAt: new Date('2024-12-01'),
  updatedAt: new Date('2024-12-15'),
  isPublic: true,
  viewCount: 1234,
  tiers: [
    {
      tier: 'SSS',
      animes: [
        {
          id: '13',
          title: '프리렌',
          titleJa: '葬送のフリーレン',
          thumbnail: 'https://placehold.co/150x200/2a3a5a/white?text=Frieren',
          year: 2023,
          season: 'Fall',
        },
        {
          id: '12',
          title: '던전밥',
          titleJa: 'ダンジョン飯',
          thumbnail: 'https://placehold.co/150x200/5a3a2a/white?text=Dungeon',
          year: 2024,
          season: 'Winter',
        },
      ],
    },
    {
      tier: 'SS',
      animes: [
        {
          id: '14',
          title: '86',
          titleJa: '86-エイティシックス-',
          thumbnail: 'https://placehold.co/150x200/4a2a3a/white?text=86',
          year: 2021,
          season: 'Spring',
        },
        {
          id: '11',
          title: '바이올렛 에버가든',
          titleJa: 'ヴァイオレット・エヴァーガーデン',
          thumbnail: 'https://placehold.co/150x200/3a3a5a/white?text=Violet',
          year: 2018,
          season: 'Winter',
        },
      ],
    },
    {
      tier: 'S',
      animes: [
        {
          id: '3',
          title: '귀멸의 칼날',
          titleJa: '鬼滅の刃',
          thumbnail: 'https://placehold.co/150x200/4a1a2a/white?text=Demon',
          year: 2019,
          season: 'Spring',
        },
        {
          id: '5',
          title: '주술회전',
          titleJa: '呪術廻戦',
          thumbnail: 'https://placehold.co/150x200/1a3a4a/white?text=JJK',
          year: 2020,
          season: 'Fall',
        },
        {
          id: '7',
          title: '스파이 패밀리',
          titleJa: 'SPY×FAMILY',
          thumbnail: 'https://placehold.co/150x200/2a5a3a/white?text=SPY',
          year: 2022,
          season: 'Spring',
        },
      ],
    },
    {
      tier: 'A',
      animes: [
        {
          id: '6',
          title: '체인소 맨',
          titleJa: 'チェンソーマン',
          thumbnail: 'https://placehold.co/150x200/5a1a1a/white?text=CSM',
          year: 2022,
          season: 'Fall',
        },
        {
          id: '15',
          title: '리제로',
          titleJa: 'Re:ゼロから始める異世界生活',
          thumbnail: 'https://placehold.co/150x200/3a2a4a/white?text=ReZero',
          year: 2016,
          season: 'Spring',
        },
      ],
    },
    {
      tier: 'B',
      animes: [
        {
          id: '19',
          title: '무직전생',
          titleJa: '無職転生',
          thumbnail: 'https://placehold.co/150x200/4a4a2a/white?text=Mushoku',
          year: 2021,
          season: 'Winter',
        },
      ],
    },
    {
      tier: 'C',
      animes: [],
    },
    {
      tier: 'D',
      animes: [],
    },
    {
      tier: 'E',
      animes: [],
    },
  ],
};
