'use client';

import { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { Header } from '../../../../../../shared/components/Header';
import { ProfileHeader } from '../../../../../../shared/components/ProfileHeader';
import { availableTitles } from '../../../../../../shared/model/titles';
import { profilesApi } from '../../../../../../shared/api/profiles';
import { useUser } from '../../../../../../shared/hooks/useUser';

interface SettingsPageViewProps {
  userId: string;
}

export function SettingsPageView({ userId }: SettingsPageViewProps) {
  const { user } = useUser();
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCurrentTitle = async () => {
      const profile = await profilesApi.getProfile(userId);
      if (profile) {
        setCurrentTitle(profile.favorite_anime || null);
        setSelectedTitle(profile.favorite_anime || null);
      }
    };
    loadCurrentTitle();
  }, [userId]);

  const handleTitleClick = async (title: string) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (user.id !== userId) {
      alert('권한이 없습니다.');
      return;
    }

    setSelectedTitle(title);
    setSaving(true);

    try {
      await profilesApi.updateProfile(userId, {
        favorite_anime: title,
      });

      setCurrentTitle(title);

      // ProfileHeader에 칭호 변경 이벤트 전달
      window.dispatchEvent(new CustomEvent('titleUpdated', { detail: { title } }));
    } catch (error) {
      console.error('Error updating title:', error);
      alert('칭호 변경 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveTitle = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (user.id !== userId) {
      alert('권한이 없습니다.');
      return;
    }

    setSelectedTitle(null);
    setSaving(true);

    try {
      await profilesApi.updateProfile(userId, {
        favorite_anime: null,
      });

      setCurrentTitle(null);

      // ProfileHeader에 칭호 제거 이벤트 전달
      window.dispatchEvent(new CustomEvent('titleUpdated', { detail: { title: null } }));
    } catch (error) {
      console.error('Error removing title:', error);
      alert('칭호 제거 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />
      <ProfileHeader userId={userId} activePage="settings" />

      <div className={containerStyle}>
        <div className={sectionHeaderStyle}>
          <h2 className={sectionTitleStyle}>칭호 선택</h2>
        </div>

        <div className={spacerStyle} />

        <div className={descriptionStyle}>
          프로필에 표시될 칭호를 선택하세요. 클릭하면 자동으로 저장됩니다.
          {saving && <span> (저장 중...)</span>}
        </div>

        <div className={spacerStyle} />

        <div className={titlesGridStyle}>
          {availableTitles.map((title) => (
            <button
              key={title}
              className={selectedTitle === title ? titleCardActiveStyle : titleCardStyle}
              onClick={() => handleTitleClick(title)}
              disabled={saving}
            >
              {title}
            </button>
          ))}
        </div>

        <div className={spacerStyle} />

        {selectedTitle && (
          <div className={removeButtonContainerStyle}>
            <button className={removeButtonStyle} onClick={handleRemoveTitle} disabled={saving}>
              칭호 제거
            </button>
          </div>
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
  height: 16px;
`;

const sectionHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const sectionTitleStyle = css`
  font-size: 24px;
  font-weight: 800;
  margin: 0;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const descriptionStyle = css`
  font-size: 14px;
  color: #8a8f95;
  line-height: 1.6;
`;

const titlesGridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const titleCardStyle = css`
  padding: 16px;
  background: #ffffff;
  border: 1px solid #dddfe0;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: #f7f8f9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const titleCardActiveStyle = css`
  padding: 16px;
  background: #f7f8f9;
  border: 2px solid #000000;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const removeButtonContainerStyle = css`
  display: flex;
  justify-content: center;
`;

const removeButtonStyle = css`
  padding: 12px 16px;
  background: #f7f8f9;
  color: #000000;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #dadfe3;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
