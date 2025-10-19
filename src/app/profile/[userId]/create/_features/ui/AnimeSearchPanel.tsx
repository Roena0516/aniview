'use client';

import { useState } from 'react';
import { css } from '@emotion/css';
import { Anime } from '../../_entities/model/types';

interface AnimeSearchPanelProps {
  animes: Anime[];
  usedAnimeIds: Set<string>;
}

export function AnimeSearchPanel({ animes, usedAnimeIds }: AnimeSearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDragStart = (e: React.DragEvent, anime: Anime) => {
    e.dataTransfer.setData('anime', JSON.stringify(anime));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const filteredAnimes = animes.filter((anime) => {
    const isUsed = usedAnimeIds.has(anime.id);
    const matchesSearch =
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anime.titleJa?.toLowerCase().includes(searchTerm.toLowerCase());
    return !isUsed && matchesSearch;
  });

  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <h2 className={titleStyle}>애니메이션 검색</h2>
        <input
          type="text"
          placeholder="애니메이션 검색..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={searchInputStyle}
        />
      </div>
      <div className={animeListStyle}>
        {filteredAnimes.length === 0 ? (
          <div className={emptyStateStyle}>
            {searchTerm ? '검색 결과가 없습니다' : '모든 애니메이션이 사용되었습니다'}
          </div>
        ) : (
          <div className={gridStyle}>
            {filteredAnimes.map((anime) => (
              <div
                key={anime.id}
                draggable
                onDragStart={(e) => handleDragStart(e, anime)}
                className={animeCardStyle}
              >
                <img
                  src={anime.thumbnail}
                  alt={anime.title}
                  className={thumbnailStyle}
                />
                <div className={animeTitleStyle}>{anime.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const containerStyle = css`
  width: 100%;
  background: #ffffff;
  border: 1px solid #dddfe0;
  overflow: hidden;
`;

const headerStyle = css`
  padding: 16px;
  border-bottom: 1px solid #dddfe0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const titleStyle = css`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const searchInputStyle = css`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dddfe0;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #8a8f95;
  }

  &::placeholder {
    color: #8a8f95;
  }
`;

const animeListStyle = css`
  padding: 16px;
  max-height: 600px;
  overflow-y: auto;
`;

const emptyStateStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #8a8f95;
  font-size: 14px;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
`;

const animeCardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: grab;
  transition: box-shadow 0.2s ease;

  &:active {
    cursor: grabbing;
  }
`;

const thumbnailStyle = css`
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  ${animeCardStyle}:hover & {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const animeTitleStyle = css`
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
`;
