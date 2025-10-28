import axios from 'axios';

const ANIME_API_BASE_URL = 'https://api.laftel.net/api/search/v3';

/**
 * Laftel API 응답 타입
 */
export interface LaftelAnimeResponse {
  id: number;
  name: string;
  img: string;
  genres: string[];
}

export interface LaftelSearchResponse {
  count: number;
  results: LaftelAnimeResponse[];
  next: string | null;
}

/**
 * 프로젝트에서 사용하는 애니메이션 타입
 */
export interface Anime {
  id: string;
  title: string;
  titleJa?: string;
  thumbnail: string;
  year?: number;
  season?: string;
  genres?: string[];
}

/**
 * API 응답을 프로젝트 타입으로 변환
 */
function transformAnimeResponse(apiAnime: LaftelAnimeResponse): Anime {
  return {
    id: apiAnime.id.toString(),
    title: apiAnime.name,
    thumbnail: apiAnime.img,
    genres: apiAnime.genres,
  };
}

export const animesApi = {
  /**
   * 애니메이션 목록 조회 (Laftel API)
   * @param size 가져올 개수
   * @param offset 페이지 오프셋
   * @param keyword 검색 키워드
   */
  async getAnimes(params: {
    size: number;
    offset?: number;
    keyword?: string;
  }): Promise<{ animes: Anime[]; hasNext: boolean }> {
    try {
      const hasKeyword = params.keyword && params.keyword.trim() !== '';

      // keyword가 있으면 검색 API, 없으면 discover API 사용
      if (hasKeyword) {
        // 검색 API
        const response = await axios.get<LaftelSearchResponse>(
          `${ANIME_API_BASE_URL}/keyword/`,
          {
            params: {
              keyword: params.keyword,
              viewing_only: true,
              offset: params.offset || 0,
              size: params.size,
            },
          }
        );

        return {
          animes: response.data.results.map(transformAnimeResponse),
          hasNext: response.data.next !== null,
        };
      } else {
        // 전체 목록 API (rank 정렬)
        const response = await axios.get<LaftelSearchResponse>(
          'https://api.laftel.net/api/search/v1/discover/',
          {
            params: {
              sort: 'rank',
              viewable: true,
              offset: params.offset || 0,
              size: params.size,
            },
          }
        );

        return {
          animes: response.data.results.map(transformAnimeResponse),
          hasNext: response.data.next !== null,
        };
      }
    } catch (error) {
      console.error('Error fetching animes:', error);
      return {
        animes: [],
        hasNext: false,
      };
    }
  },

  /**
   * 애니메이션 검색 (무한 스크롤용)
   */
  async searchAnimes(
    searchQuery: string,
    size: number = 20,
    offset: number = 0
  ): Promise<{ animes: Anime[]; hasNext: boolean }> {
    return this.getAnimes({
      size,
      offset,
      keyword: searchQuery,
    });
  },

  /**
   * 초기 애니메이션 목록 로드
   */
  async getInitialAnimes(size: number = 50): Promise<Anime[]> {
    const result = await this.getAnimes({ size });
    return result.animes;
  },
};
