'use client';

import { css } from '@emotion/css';
import { TierListData } from '../../_entities/model/types';
import { Header } from '../../../../../../../shared/components/Header';
import { ProfileHeader } from '../../../../../../../shared/components/ProfileHeader';

interface TierListViewPageProps {
  tierList: TierListData;
}

const tierColors: Record<string, string> = {
  SSS: '#d5f5e3',
  SS: '#aed6f1',
  S: '#d7bde2',
  A: '#f9cbb9',
  B: '#fad7a0',
  C: '#fff9c4',
  D: '#e0e0e0',
  E: '#f5f5f5',
};

export function TierListViewPage({ tierList }: TierListViewPageProps) {
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('링크가 복사되었습니다!');
  };

  return (
    <>
      <Header />
      <ProfileHeader userId={tierList.userId} />

      <div className={containerStyle}>

        <div className={headerSectionStyle}>
          <div className={titleSectionStyle}>
            <h1 className={titleStyle}>{tierList.title}</h1>
            {tierList.description && (
              <p className={descriptionStyle}>{tierList.description}</p>
            )}
            <div className={metaInfoStyle}>
              <span className={metaItemStyle}>
                작성자: <b>{tierList.userId}</b>
              </span>
              <span className={metaDividerStyle}>·</span>
              <span className={metaItemStyle}>
                조회수: <b>{tierList.viewCount.toLocaleString('ko-KR')}</b>
              </span>
              <span className={metaDividerStyle}>·</span>
              <span className={metaItemStyle}>
                작성일: <b>{tierList.createdAt.toLocaleDateString('ko-KR')}</b>
              </span>
            </div>
          </div>

          <div className={actionButtonsStyle}>
            <button className={shareButtonStyle} onClick={handleShare}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              공유하기
            </button>
            <a href={`/profile/${tierList.userId}/create`} className={editButtonStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              새로 만들기
            </a>
          </div>
        </div>

        <div className={spacerMediumStyle} />

        <div className={tierListContainerStyle}>
          {tierList.tiers.map((tierItem) => (
            <div key={tierItem.tier} className={tierRowStyle}>
              <div className={tierLabelStyle(tierItem.tier)}>
                {tierItem.tier}
              </div>
              <div className={tierContentStyle}>
                {tierItem.animes.length === 0 ? (
                  <div className={emptyStateStyle}>-</div>
                ) : (
                  <div className={animeGridStyle}>
                    {tierItem.animes.map((anime) => (
                      <div key={anime.id} className={animeCardStyle}>
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
  padding: 0 16px;
`;

const spacerMediumStyle = css`
  display: block;
  height: 32px;
`;

const headerSectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #dddfe0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const titleSectionStyle = css`
  flex: 1;
  min-width: 0;
`;

const titleStyle = css`
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px 0;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const descriptionStyle = css`
  font-size: 16px;
  color: #8a8f95;
  margin: 0 0 16px 0;
  line-height: 1.6;
`;

const metaInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #8a8f95;
`;

const metaItemStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const metaDividerStyle = css`
  color: #dddfe0;
`;

const actionButtonsStyle = css`
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const shareButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f7f8f9;
  color: #000000;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #dadfe3;
    box-shadow: rgba(218, 223, 227, 0.4) 0px 4px 8px;
    transform: translate(0, -4px);
  }

  &:active {
    box-shadow: rgba(218, 223, 227, 0.4) 0px 2px 4px;
    transform: translate(0, -2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const editButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f7f8f9;
  color: #000000;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #dadfe3;
    box-shadow: rgba(218, 223, 227, 0.4) 0px 4px 8px;
    transform: translate(0, -4px);
  }

  &:active {
    box-shadow: rgba(218, 223, 227, 0.4) 0px 2px 4px;
    transform: translate(0, -2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const tierListContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const tierRowStyle = css`
  display: flex;
  width: 100%;
  border: 1px solid #dddfe0;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
`;

const tierLabelStyle = (tier: string) => css`
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
  color: #dddfe0;
  font-size: 24px;
  font-weight: 300;
`;

const animeGridStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const animeCardStyle = css`
  width: 80px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const thumbnailStyle = css`
  width: 80px;
  height: 107px;
  object-fit: cover;
  border-radius: 4px;
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
