'use client';

import { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { mockProfile } from '../model/profile';
import { createClient } from '../lib/supabase/client';
import { profilesApi } from '../api/profiles';
import type { Profile } from '../model/database';

interface ProfileHeaderProps {
  userId: string;
  activePage?: 'tierlist' | 'create' | 'settings' | 'gallery' | 'photo';
  tierlistId?: string;
}

export function ProfileHeader({ userId, activePage = 'tierlist', tierlistId }: ProfileHeaderProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      let data = await profilesApi.getProfile(userId);

      // 프로필이 없으면 생성 (Google 로그인 직후)
      if (!data) {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user && user.id === userId) {
          const { data: newProfile, error } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              display_name: user.user_metadata?.full_name || user.email || 'User',
              avatar_url: user.user_metadata?.avatar_url,
              username: user.email?.split('@')[0],
              favorite_anime: '신입',
            })
            .select()
            .single();

          if (!error && newProfile) {
            data = newProfile;
          }
        }
      }

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();

    // 칭호 업데이트 이벤트 리스너
    const handleTitleUpdate = (event: CustomEvent) => {
      const { title } = event.detail;
      setProfile((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          favorite_anime: title,
        };
      });
    };

    window.addEventListener('titleUpdated', handleTitleUpdate as EventListener);

    return () => {
      window.removeEventListener('titleUpdated', handleTitleUpdate as EventListener);
    };
  }, [userId]);

  if (loading || !profile) {
    return <div className={containerStyle}>Loading...</div>;
  }

  return (
    <div className={containerStyle}>
      <div className={spacerStyle} />

      <header className={headerTopStyle}>
        <a href="/" className={logoLinkStyle}>
          <div className={logoStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          </div>
        </a>
        <a href={`/profile/${userId}/tierlist`} className={urlLinkStyle}>
          <span className={urlPrefixStyle}>aniview.com/</span>
          <b>{userId}</b>
        </a>
        <div className={spacerFlexStyle} />
        <div className={friendCodeStyle}>
          <span className={friendCodeLabelStyle}>친구 코드</span>
          9081527573013
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path>
            <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path>
          </svg>
        </div>
      </header>

      <div className={spacerSmallStyle} />

      <div className={profileContentStyle}>
        <img src={profile.avatar_url || '/default-avatar.png'} alt={profile.display_name} className={avatarStyle} />

        <div className={profileInfoStyle}>
          <div className={profileTopStyle}>
            {profile.favorite_anime && (
              <div className={favoriteBadgeStyle}>{profile.favorite_anime}</div>
            )}
          </div>

          <div className={profileNameRowStyle}>
            <h1 className={displayNameStyle}>
              {profile.display_name.split('').map((char, i) => (
                <span key={i} className={charStyle}>{char}</span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      <div className={spacerMediumStyle} />

      <div className={statsRowStyle}>
        <div className={statItemStyle}>
          <div className={statLabelStyle}>티어표 개수</div>
          <div className={statValueStyle}>{profile.tier_list_count}</div>
        </div>
        <div className={dividerStyle} />
        <div className={statItemStyle}>
          <div className={statLabelStyle}>총 조회수</div>
          <div className={statValueStyle}>{profile.total_view_count?.toLocaleString('ko-KR') || 0}</div>
        </div>
      </div>

      <div className={spacerMediumStyle} />

      <nav className={tierlistId ? navButtonsContainerStyleWithPhoto : navButtonsContainerStyle}>
        <a
          href={`/profile/${userId}/tierlist`}
          className={activePage === 'tierlist' ? navButtonActiveStyle : navButtonStyle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <span>티어표 목록</span>
        </a>
        <a
          href={`/profile/${userId}/create`}
          className={activePage === 'create' ? navButtonActiveStyle : navButtonStyle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <span>티어표 생성</span>
        </a>
        {tierlistId && (
          <a
            href={`/profile/${userId}/tierlist/${tierlistId}/photo`}
            className={activePage === 'photo' ? navButtonActiveStyle : navButtonStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>사진관</span>
          </a>
        )}
        <a
          href={`/profile/${userId}/settings`}
          className={activePage === 'settings' ? navButtonActiveStyle : navButtonStyle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>칭호 선택</span>
        </a>
      </nav>

      <div className={spacerSmallStyle} />
    </div>
  );
}

const containerStyle = css`
  max-width: 1200px;
  padding: 0 16px;
  margin: 0 auto;
`;

const spacerStyle = css`
  display: block;
  height: 60px;
`;

const spacerSmallStyle = css`
  display: block;
  height: 32px;
`;

const spacerMediumStyle = css`
  display: block;
  height: 16px;
`;

const spacerFlexStyle = css`
  flex: 1;
`;

const headerTopStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const logoLinkStyle = css`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const logoStyle = css`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
`;

const urlLinkStyle = css`
  font-size: 75%;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const urlPrefixStyle = css`
  color: #8a8f95;
`;

const friendCodeStyle = css`
  display: flex;
  font-feature-settings: "ss06", "zero";
  font-size: 75%;
  cursor: pointer;
  gap: 4px;
  align-items: center;
`;

const friendCodeLabelStyle = css`
  color: #8a8f95;
`;

const profileContentStyle = css`
  display: flex;
  gap: 16px;
`;

const avatarStyle = css`
  display: block;
  width: 96px;
  height: 96px;
  border-radius: 8px;
  object-fit: cover;
`;

const profileInfoStyle = css`
  min-width: 0;
  flex: 1;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: space-between;
`;

const profileTopStyle = css`
  min-width: 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 240px;
  max-width: 100%;
`;

const favoriteBadgeStyle = css`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  padding: 4px;
  width: 100%;
  font-size: 80%;
  text-align: center;
  border-bottom: 1px solid #f0b91b;
  background-image: linear-gradient(to right, #fff9e6, rgba(255, 249, 230, 0.5));
`;

const profileNameRowStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: baseline;
  justify-content: space-between;
  font-size: 160%;

  @media (max-width: 640px) {
    font-size: 140%;
  }

  @media (max-width: 480px) {
    font-size: 120%;
  }
`;

const displayNameStyle = css`
  display: flex;
  font-weight: 800;
  margin: 0;
`;

const charStyle = css`
  display: block;
  flex: 0 0 1em;
  min-width: 0;
  text-align: center;
`;

const statsRowStyle = css`
  padding-left: 112px;
  display: flex;
  align-items: stretch;
  gap: 16px;

  @media (max-width: 640px) {
    gap: 8px;
    padding-left: 0;
    flex-direction: column;
  }
`;

const statItemStyle = css`
  flex: 1;
  min-width: 0;
  max-width: 120px;

  @media (max-width: 640px) {
    display: flex;
    max-width: none;
  }
`;

const statLabelStyle = css`
  color: #8a8f95;
  font-size: 75%;

  @media (max-width: 640px) {
    flex: 0 0 112px;
  }
`;

const statValueStyle = css`
  font-weight: 600;

  @media (max-width: 480px) {
    flex: 1;
  }
`;

const dividerStyle = css`
  flex: 0 0 1px;
  width: 1px;
  background-color: #dddfe0;

  @media (max-width: 640px) {
    display: none;
  }
`;

const navButtonsContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const navButtonsContainerStyleWithPhoto = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const navButtonStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: transparent;
  color: #000000;
  border: none;
  border-radius: 4px;
  font-size: 75%;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: #f7f8f9;
    text-decoration: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const navButtonActiveStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: #f7f8f9;
  color: #000000;
  border: none;
  border-radius: 4px;
  font-size: 75%;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: #dadfe3;
    text-decoration: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
