'use client';

import { css } from '@emotion/css';
import { TierListSummary } from '../../_entities/model/types';
import { Header } from '../../../../shared/components/Header';

interface GalleryPageProps {
  tierlists: TierListSummary[];
}

export function GalleryPage({ tierlists }: GalleryPageProps) {
  return (
    <>
      <Header />

      <div className={containerStyle}>
        <div className={spacerStyle} />

        <div className={headerSectionStyle}>
          <h1 className={titleStyle}>티어표 갤러리</h1>
          <p className={descriptionStyle}>
            다른 사용자들이 만든 애니메이션 티어표를 구경해보세요
          </p>
        </div>

        <div className={spacerMediumStyle} />

        <div className={statsRowStyle}>
          <div className={statItemStyle}>
            전체 <b>{tierlists.length}</b>개
          </div>
          <div className={statItemStyle}>
            총 조회수 <b>{tierlists.reduce((sum, t) => sum + t.viewCount, 0).toLocaleString('ko-KR')}</b>
          </div>
        </div>

        <div className={spacerMediumStyle} />

        <div className={gridStyle}>
          {tierlists.map((tierlist) => (
            <a
              key={tierlist.id}
              href={`/profile/${tierlist.userId}/tierlist/${tierlist.id}`}
              className={cardStyle}
            >
              <div className={thumbnailContainerStyle}>
                <img
                  src={tierlist.thumbnail}
                  alt={tierlist.title}
                  className={thumbnailStyle}
                />
                <div className={overlayStyle}>
                  <div className={viewCountStyle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    {tierlist.viewCount.toLocaleString('ko-KR')}
                  </div>
                </div>
              </div>

              <div className={cardContentStyle}>
                <h3 className={cardTitleStyle}>{tierlist.title}</h3>
                {tierlist.description && (
                  <p className={cardDescriptionStyle}>{tierlist.description}</p>
                )}
                <div className={cardMetaStyle}>
                  <span className={authorStyle}>@{tierlist.userId}</span>
                  <span className={dotStyle}>·</span>
                  <span className={dateStyle}>
                    {tierlist.createdAt.toLocaleDateString('ko-KR')}
                  </span>
                  <span className={dotStyle}>·</span>
                  <span className={animeCountStyle}>
                    {tierlist.animeCount}개 작품
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

const containerStyle = css`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 60px;
`;

const spacerStyle = css`
  display: block;
  height: 60px;
`;

const spacerMediumStyle = css`
  display: block;
  height: 32px;
`;

const headerSectionStyle = css`
  text-align: center;
`;

const titleStyle = css`
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 12px 0;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const descriptionStyle = css`
  font-size: 16px;
  color: #8a8f95;
  margin: 0;
`;

const statsRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 16px;
  background: #f7f8f9;
  border-radius: 8px;
  font-size: 14px;
  color: #8a8f95;

  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const statItemStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;

  b {
    color: #000000;
  }
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const cardStyle = css`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddfe0;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const thumbnailContainerStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f7f8f9;
`;

const thumbnailStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const overlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 12px;
`;

const viewCountStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const cardContentStyle = css`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const cardTitleStyle = css`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const cardDescriptionStyle = css`
  font-size: 14px;
  color: #8a8f95;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
`;

const cardMetaStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #8a8f95;
`;

const authorStyle = css`
  font-weight: 600;
  color: #000000;
`;

const dotStyle = css`
  color: #dddfe0;
`;

const dateStyle = css``;

const animeCountStyle = css``;
