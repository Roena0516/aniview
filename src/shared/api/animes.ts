import axios from 'axios';

const ANIME_API_BASE_URL = 'https://prod.windeath44.wiki/api';

/**
 * 애니메이션 API 응답 타입
 */
export interface AnimeApiResponse {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}

export interface AnimesResponse {
  message: string;
  data: {
    values: AnimeApiResponse[];
    hasNext: boolean;
  };
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
function transformAnimeResponse(apiAnime: AnimeApiResponse): Anime {
  return {
    id: apiAnime.animeId.toString(),
    title: apiAnime.name,
    thumbnail: apiAnime.imageUrl,
    genres: apiAnime.genres,
  };
}

export const animesApi = {
  /**
   * 애니메이션 목록 조회
   * @param size 가져올 개수 (required)
   * @param cursorId 커서 ID (optional)
   * @param name 애니메이션 이름으로 검색 (optional)
   */
  async getAnimes(params: {
    size: number;
    cursorId?: number;
    name?: string;
  }): Promise<{ animes: Anime[]; hasNext: boolean }> {
    try {
      const response = await axios.get<AnimesResponse>(
        `${ANIME_API_BASE_URL}/animes`,
        {
          params: {
            size: params.size,
            ...(params.cursorId && { cursorId: params.cursorId }),
            ...(params.name && { name: params.name }),
          },
        }
      );

      return {
        animes: response.data.data.values.map(transformAnimeResponse),
        hasNext: response.data.data.hasNext,
      };
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
    size: number = 20
  ): Promise<{ animes: Anime[]; hasNext: boolean }> {
    return this.getAnimes({
      size,
      name: searchQuery,
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
