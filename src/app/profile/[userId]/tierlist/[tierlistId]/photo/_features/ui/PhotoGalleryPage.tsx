'use client';

import { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/css';
import html2canvas from 'html2canvas';
import { TierListData } from '../../../_entities/model/types';
import { Header } from '../../../../../../../../shared/components/Header';
import { ProfileHeader } from '../../../../../../../../shared/components/ProfileHeader';
import { profilesApi } from '../../../../../../../../shared/api/profiles';
import type { Profile } from '../../../../../../../../shared/model/database';

interface PhotoGalleryPageProps {
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

export function PhotoGalleryPage({ tierList }: PhotoGalleryPageProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profilesApi.getProfile(tierList.userId);
      setProfile(data);
    };

    fetchProfile();
  }, [tierList.userId]);

  const handleDownload = async () => {
    if (!exportRef.current) return;

    setIsExporting(true);

    try {
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#f7f8f9',
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `tierlist-${tierList.title}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      alert('티어표가 다운로드되었습니다!');
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('PNG 다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Header />
      <ProfileHeader
        userId={tierList.userId}
        tierlistId={tierList.id}
        activePage="photo"
      />

      <div className={containerStyle}>
        <div className={headerSectionStyle}>
          <div className={titleSectionStyle}>
            <h1 className={titleStyle}>사진관</h1>
            <p className={descriptionStyle}>
              티어표 이미지를 미리보고 다운로드할 수 있습니다.
            </p>
          </div>

          <button
            className={downloadButtonStyle}
            onClick={handleDownload}
            disabled={isExporting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            {isExporting ? '다운로드 중...' : 'PNG로 다운로드'}
          </button>
        </div>

        <div className={spacerMediumStyle} />

        <div className={previewContainerStyle}>
          <div ref={exportRef} className={exportAreaStyle}>
            <div className={photoHeaderStyle}>
              <div className={profileSectionStyle}>
                <img
                  src={profile?.avatar_url || '/default-avatar.png'}
                  alt={tierList.authorName}
                  className={profileAvatarStyle}
                />
                <div className={profileInfoSectionStyle}>
                  <div className={dateTimeStyle}>
                    {tierList.createdAt.toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} {tierList.createdAt.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className={userNameStyle}>{tierList.authorName}</div>
                  <div className={badgesRowStyle}>
                    {profile?.favorite_anime && (
                      <div className={titleBadgeStyle}>{profile.favorite_anime}</div>
                    )}
                    <div className={tierlistBadgeStyle}>티어표</div>
                    <div className={statBadgeStyle}>
                      ★ × {profile?.tier_list_count || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={tierlistTitleSectionStyle}>
              <div className={tierlistTitleStyle}>{tierList.title}</div>
              {tierList.description && (
                <div className={tierlistDescriptionStyle}>{tierList.description}</div>
              )}
            </div>

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

            <div className={spacerSmallStyle} />

            <div className={photoFooterStyle}>
              <span className={watermarkStyle}>aniview.com</span>
            </div>
          </div>
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
  margin: 0;
  line-height: 1.6;
`;

const spacerSmallStyle = css`
  display: block;
  height: 16px;
`;

const spacerMediumStyle = css`
  display: block;
  height: 32px;
`;

const previewContainerStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const exportAreaStyle = css`
  width: 100%;
  max-width: 800px;
  background: #ffffff;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const photoHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 12px;
  border-bottom: 2px solid #dddfe0;
  gap: 16px;
`;

const profileSectionStyle = css`
  display: flex;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

const profileAvatarStyle = css`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const profileInfoSectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const dateTimeStyle = css`
  font-size: 11px;
  color: #8a8f95;
  margin: 0;
`;

const userNameStyle = css`
  font-size: 20px;
  font-weight: 800;
  color: #000000;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const badgesRowStyle = css`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
`;

const titleBadgeStyle = css`
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  border-bottom: 1px solid #f0b91b;
  background-image: linear-gradient(to right, #fff9e6, rgba(255, 249, 230, 0.5));
  white-space: nowrap;
`;

const tierlistBadgeStyle = css`
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  background: #f7f8f9;
  border-radius: 4px;
  white-space: nowrap;
`;

const statBadgeStyle = css`
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  background: #f7f8f9;
  border-radius: 4px;
  white-space: nowrap;
`;

const tierlistTitleSectionStyle = css`
  text-align: center;
  padding: 12px 0 8px 0;
`;

const tierlistTitleStyle = css`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #000000;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const tierlistDescriptionStyle = css`
  font-size: 13px;
  color: #8a8f95;
  margin: 0;
  line-height: 1.6;
`;

const photoFooterStyle = css`
  text-align: center;
  padding-top: 16px;
  border-top: 2px solid #dddfe0;
`;

const watermarkStyle = css`
  font-size: 12px;
  color: #8a8f95;
  font-weight: 600;
`;

const tierListContainerStyle = css`
  display: flex;
  flex-direction: column;
  border: 1px solid #dddfe0;
  border-radius: 4px;
  overflow: hidden;
`;

const tierRowStyle = css`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dddfe0;
  background: #ffffff;

  &:last-child {
    border-bottom: none;
  }
`;

const tierLabelStyle = (tier: string) => css`
  flex: 0 0 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${tierColors[tier]};
  font-weight: 800;
  font-size: 24px;
  border-right: 1px solid #dddfe0;

  @media (max-width: 640px) {
    flex: 0 0 60px;
    font-size: 20px;
  }
`;

const tierContentStyle = css`
  flex: 1;
  min-height: 100px;
  padding: 12px;

  @media (max-width: 640px) {
    min-height: 80px;
    padding: 8px;
  }
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
  width: 70px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 640px) {
    width: 60px;
  }
`;

const thumbnailStyle = css`
  width: 70px;
  height: 93px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 2px;

  @media (max-width: 640px) {
    width: 60px;
    height: 80px;
  }
`;

const animeTitleStyle = css`
  font-size: 10px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  max-height: 26px;
`;

const downloadButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  color: #000000;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    background: #f7f8f9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
