'use client';

import { css } from '@emotion/css';
import { Anime, TierLevel } from '../../_entities/model/types';

interface TierRowProps {
  tier: TierLevel;
  animes: Anime[];
  onDrop: (anime: Anime) => void;
  onRemove: (animeId: string) => void;
}

const tierColors: Record<TierLevel, string> = {
  SSS: '#d5f5e3',
  SS: '#aed6f1',
  S: '#d7bde2',
  A: '#f9cbb9',
  B: '#fad7a0',
  C: '#fff9c4',
  D: '#e0e0e0',
  E: '#f5f5f5',
};

const tierLabels: Record<TierLevel, string> = {
  SSS: 'SSS',
  SS: 'SS',
  S: 'S',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
};

export function TierRow({ tier, animes, onDrop, onRemove }: TierRowProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const animeData = e.dataTransfer.getData('anime');
    if (animeData) {
      const anime: Anime = JSON.parse(animeData);
      onDrop(anime);
    }
  };

  const handleRemoveClick = (animeId: string) => {
    onRemove(animeId);
  };

  return (
    <div className={containerStyle}>
      <div className={tierLabelStyle(tier)}>{tierLabels[tier]}</div>
      <div
        className={tierContentStyle}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {animes.length === 0 ? (
          <div className={emptyStateStyle}>드래그하여 애니메이션 추가</div>
        ) : (
          <div className={animeGridStyle}>
            {animes.map((anime) => (
              <div key={anime.id} className={animeCardStyle}>
                <button
                  className={removeButtonStyle}
                  onClick={() => handleRemoveClick(anime.id)}
                >
                  ×
                </button>
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
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dddfe0;
  background: #ffffff;
  overflow: hidden;

  &:last-child {
    border-bottom: none;
  }
`;

const tierLabelStyle = (tier: TierLevel) => css`
  flex: 0 0 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${tierColors[tier]};
  font-weight: 800;
  font-size: 32px;
  border-right: 1px solid #dddfe0;
`;

const tierContentStyle = css`
  flex: 1;
  min-height: 120px;
  padding: 16px;
`;

const emptyStateStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8a8f95;
  font-size: 14px;
`;

const animeGridStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const animeCardStyle = css`
  position: relative;
  width: 80px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover button {
    opacity: 1;
  }
`;

const removeButtonStyle = css`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: #000000;
  color: #ffffff;
  border: 2px solid #ffffff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:hover {
    background: #ff0000;
  }
`;

const thumbnailStyle = css`
  width: 80px;
  height: 107px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const animeTitleStyle = css`
  font-size: 11px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  max-height: 28px;
`;
