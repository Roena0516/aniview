'use client';

import { useState } from 'react';
import { css } from '@emotion/css';
import { TierListSummary } from '../../_entities/model/types';
import { Header } from '../../../../shared/components/Header';
import { ViewModeToggle, type ViewMode } from '../../../../shared/components/ViewModeToggle';

interface GalleryPageProps {
  tierlists: TierListSummary[];
}

export function GalleryPage({ tierlists }: GalleryPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <>
      <Header />

      <div className={containerStyle}>
        <div className={spacerStyle} />

        <div className={headerSectionStyle}>
          <h1 className={titleStyle}>티어표 갤러리</h1>
          <ViewModeToggle value={viewMode} onChange={handleViewModeChange} />
        </div>

        <div className={spacerMediumStyle} />

        {tierlists.length === 0 ? (
          <div className={emptyStateStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="9"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <p className={emptyTextStyle}>아직 생성된 티어표가 없습니다</p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' && (
              <div className={gridStyle}>
                {tierlists.map((tierlist) => (
                  <a
                    key={tierlist.id}
                    href={`/profile/${tierlist.userId}/tierlist/${tierlist.id}`}
                    className={gridCardStyle}
                  >
                    <div className={gridThumbnailWrapperStyle}>
                      {tierlist.thumbnail && (
                        <img
                          src={tierlist.thumbnail}
                          alt={tierlist.title}
                          className={gridThumbnailStyle}
                        />
                      )}
                      <div className={gridOverlayTopStyle}>
                        <div className={gridViewCountBadgeStyle}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          {tierlist.viewCount.toLocaleString('ko-KR')}
                        </div>
                      </div>
                      <div className={gridOverlayBottomStyle}>
                        <div className={gridDateBadgeStyle}>
                          {tierlist.createdAt.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className={gridTitleBarStyle}>
                      <h3 className={gridCardTitleStyle}>{tierlist.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className={listStyle}>
                {tierlists.map((tierlist) => (
                  <a
                    key={tierlist.id}
                    href={`/profile/${tierlist.userId}/tierlist/${tierlist.id}`}
                    className={listCardStyle}
                  >
                    <div className={listThumbnailContainerStyle}>
                      {tierlist.thumbnail && (
                        <img
                          src={tierlist.thumbnail}
                          alt={tierlist.title}
                          className={listThumbnailStyle}
                        />
                      )}
                    </div>
                    <div className={listDateBadgeStyle}>
                      {tierlist.createdAt.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}
                    </div>
                    <div className={listCardContentStyle}>
                      <h3 className={listCardTitleStyle}>{tierlist.title}</h3>
                      {tierlist.description && (
                        <p className={listCardDescriptionStyle}>{tierlist.description}</p>
                      )}
                    </div>
                    <div className={listCardMetaStyle}>
                      <div className={listViewBadgeStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {tierlist.viewCount.toLocaleString('ko-KR')}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {viewMode === 'table' && (
              <div className={tableStyle}>
                {tierlists.map((tierlist, index) => (
                  <a
                    key={tierlist.id}
                    href={`/profile/${tierlist.userId}/tierlist/${tierlist.id}`}
                    className={tableRowStyle}
                  >
                    <div className={tableRankStyle}>{index + 1}</div>
                    <div className={tableDateBadgeStyle}>
                      {tierlist.createdAt.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}
                    </div>
                    <div className={tableContentStyle}>
                      <h3 className={tableCardTitleStyle}>{tierlist.title}</h3>
                    </div>
                    <div className={tableMetaStyle}>
                      <div className={tableViewBadgeStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {tierlist.viewCount.toLocaleString('ko-KR')}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

const containerStyle = css`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 60px 16px;
`;

const spacerStyle = css`
  display: block;
  height: 60px;
`;

const spacerMediumStyle = css`
  display: block;
  height: 24px;
`;

const headerSectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: 800;
  margin: 0;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const emptyStateStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 16px;
  color: #8a8f95;

  svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const emptyTextStyle = css`
  font-size: 16px;
  margin: 0 0 24px 0;
  color: #8a8f95;
`;

// Grid View Styles
const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const gridCardStyle = css`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddfe0;
  overflow: hidden;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: #f7f8f9;
    text-decoration: none;
  }
`;

const gridThumbnailWrapperStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f7f8f9;
`;

const gridThumbnailStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const gridOverlayTopStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
`;

const gridViewCountBadgeStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.95);
  font-size: 11px;
  font-weight: 600;
  color: #000000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  svg {
    width: 12px;
    height: 12px;
  }
`;

const gridOverlayBottomStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  display: flex;
  justify-content: flex-start;
`;

const gridDateBadgeStyle = css`
  padding: 4px 12px;
  background: linear-gradient(135deg, #b39ddb 0%, #9575cd 100%);
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const gridTitleBarStyle = css`
  background: linear-gradient(to bottom, #1e3a5f 0%, #0d2847 100%);
  padding: 12px;
  min-height: 48px;
  display: flex;
  align-items: center;
`;

const gridCardTitleStyle = css`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
`;

// List View Styles
const listStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const listCardStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #ffffff;
  border-bottom: 1px solid #dddfe0;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f7f8f9;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 6px;
  }
`;

const listThumbnailContainerStyle = css`
  flex: 0 0 82px;
  width: 82px;
  height: 82px;
  overflow: hidden;
  background: #f7f8f9;

  @media (max-width: 768px) {
    flex: 0 0 64px;
    width: 64px;
    height: 64px;
  }
`;

const listThumbnailStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const listDateBadgeStyle = css`
  flex: 0 0 auto;
  padding: 8px 12px;
  background: #b39ddb;
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 6px 10px;
  }
`;

const listCardContentStyle = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

const listCardTitleStyle = css`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const listCardDescriptionStyle = css`
  font-size: 13px;
  color: #999999;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const listCardMetaStyle = css`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    margin-left: 90px;
  }
`;

const listViewBadgeStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  font-size: 11px;
  font-weight: 600;
  color: #666666;

  svg {
    width: 11px;
    height: 11px;
  }
`;

// Table View Styles
const tableStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const tableRowStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #ffffff;
  border-bottom: 1px solid #dddfe0;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f7f8f9;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 4px;
  }
`;

const tableRankStyle = css`
  flex: 0 0 24px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: #666666;
  line-height: 1;

  @media (max-width: 768px) {
    flex: 0 0 20px;
    font-size: 12px;
  }
`;

const tableDateBadgeStyle = css`
  flex: 0 0 auto;
  padding: 6px 10px;
  background: #b39ddb;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 4px 8px;
  }
`;

const tableContentStyle = css`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

const tableCardTitleStyle = css`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const tableMetaStyle = css`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    margin-left: 54px;
  }
`;

const tableViewBadgeStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  font-size: 11px;
  font-weight: 600;
  color: #666666;

  svg {
    width: 11px;
    height: 11px;
  }
`;
