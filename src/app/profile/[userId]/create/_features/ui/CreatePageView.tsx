'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '@emotion/css';
import type { Json } from '../../../../../../shared/model/database';
import { TierLevel, Anime, TierListItem } from '../../_entities/model/types';
import { TierRow } from './TierRow';
import { AnimeSearchPanel } from './AnimeSearchPanel';
import { Header } from '../../../../../../shared/components/Header';
import { ProfileHeader } from '../../../../../../shared/components/ProfileHeader';
import { tierlistsApi } from '../../../../../../shared/api/tierlists';
import { useUser } from '../../../../../../shared/hooks/useUser';

const initialTiers: TierLevel[] = ['SSS', 'SS', 'S', 'A', 'B', 'C'];

interface CreatePageViewProps {
  userId: string;
  editId?: string;
}

export function CreatePageView({ userId, editId }: CreatePageViewProps) {
  const [tierListItems, setTierListItems] = useState<TierListItem[]>(
    initialTiers.map((tier) => ({ tier, animes: [] }))
  );
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const usedAnimeIds = new Set(
    tierListItems.flatMap((item) => item.animes.map((anime) => anime.id))
  );

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    const loadTierlist = async () => {
      if (!editId) return;

      setLoading(true);

      try {
        const tierlist = await tierlistsApi.getTierlist(editId);

        if (tierlist) {
          setTitle(tierlist.title);
          setTierListItems(tierlist.tiers as unknown as TierListItem[]);
        } else {
          alert('티어표를 불러올 수 없습니다.');
          router.push(`/profile/${userId}/create`);
        }
      } catch (error) {
        console.error('Error loading tierlist:', error);
        alert('티어표를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadTierlist();
  }, [editId, userId, router]);

  const handleDrop = (tier: TierLevel, anime: Anime) => {
    setTierListItems((prev) =>
      prev.map((item) => {
        if (item.tier === tier) {
          const exists = item.animes.some((a) => a.id === anime.id);
          if (exists) return item;
          return { ...item, animes: [...item.animes, anime] };
        }
        return item;
      })
    );
  };

  const handleRemove = (tier: TierLevel, animeId: string) => {
    setTierListItems((prev) =>
      prev.map((item) => {
        if (item.tier === tier) {
          return {
            ...item,
            animes: item.animes.filter((anime) => anime.id !== animeId),
          };
        }
        return item;
      })
    );
  };

  const handleClear = () => {
    if (window.confirm('모든 티어를 초기화하시겠습니까?')) {
      setTierListItems(initialTiers.map((tier) => ({ tier, animes: [] })));
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!title.trim()) {
      alert('티어표 제목을 입력해주세요.');
      return;
    }

    const confirmMessage = editId ? '티어표를 수정하시겠습니까?' : '티어표를 저장하시겠습니까?';
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setSaving(true);

    try {
      // 첫 번째 애니메이션의 썸네일을 티어표 썸네일로 사용
      let thumbnail = null;
      for (const item of tierListItems) {
        if (item.animes.length > 0) {
          thumbnail = item.animes[0].thumbnail;
          break;
        }
      }

      let tierlist;

      if (editId) {
        // 수정 모드
        tierlist = await tierlistsApi.updateTierlist(editId, {
          title: title.trim(),
          description: null,
          tiers: tierListItems as unknown as Json,
          thumbnail,
        });
      } else {
        // 생성 모드
        tierlist = await tierlistsApi.createTierlist({
          user_id: user.id,
          title: title.trim(),
          description: null,
          tiers: tierListItems as unknown as Json,
          thumbnail,
        });
      }

      if (tierlist) {
        router.push(`/profile/${user.id}/tierlist/${tierlist.id}`);
      } else {
        alert(editId ? '티어표 수정에 실패했습니다.' : '티어표 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving tierlist:', error);
      alert(editId ? '티어표 수정 중 오류가 발생했습니다.' : '티어표 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <ProfileHeader userId={userId} activePage="create" />
        <div className={containerStyle}>
          <div className={loadingStyle}>티어표를 불러오는 중...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <ProfileHeader userId={userId} activePage="create" />

      <div className={containerStyle}>
        <div className={sectionHeaderStyle}>
          <h2 className={sectionTitleStyle}>
            {editId ? '애니메이션 티어표 수정' : '애니메이션 티어표'}
          </h2>
          <div className={sectionActionsStyle}>
            <button className={saveButtonStyle} onClick={handleSave} disabled={saving}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              {saving ? (editId ? '수정 중...' : '저장 중...') : (editId ? '수정하기' : '저장하기')}
            </button>
            <button className={clearButtonStyle} onClick={handleClear}>
              전체 초기화
            </button>
          </div>
        </div>

        <div className={titleInputContainerStyle}>
          <input
            type="text"
            className={titleInputStyle}
            placeholder="티어표 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className={contentStyle}>
          <div className={tierListContainerStyle}>
            <div className={tierListStyle}>
              {tierListItems.map((item) => (
                <TierRow
                  key={item.tier}
                  tier={item.tier}
                  animes={item.animes}
                  onDrop={(anime) => handleDrop(item.tier, anime)}
                  onRemove={(animeId) => handleRemove(item.tier, animeId)}
                />
              ))}
            </div>
          </div>

          <div className={searchPanelContainerStyle}>
            <AnimeSearchPanel usedAnimeIds={usedAnimeIds} />
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

const loadingStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 16px;
  font-size: 16px;
  color: #8a8f95;
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

const sectionActionsStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const titleInputContainerStyle = css`
  margin-bottom: 16px;
`;

const titleInputStyle = css`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  background: #ffffff;
  border: 1px solid #dddfe0;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #8a8f95;
    font-weight: 400;
  }

  &:focus {
    border-color: #000000;
  }
`;

const saveButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #000000;
  color: #ffffff;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #2a2a2a;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const clearButtonStyle = css`
  padding: 12px 16px;
  background: #f7f8f9;
  color: #000000;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background: #dadfe3;
  }
`;

const contentStyle = css`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const tierListContainerStyle = css`
  flex: 1;
  min-width: 0;
`;

const tierListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const searchPanelContainerStyle = css`
  flex: 0 0 400px;

  @media (max-width: 1024px) {
    flex: 1;
  }
`;

const loadingContainerStyle = css`
  width: 100%;
  background: #ffffff;
  border: 1px solid #dddfe0;
  border-radius: 4px;
  padding: 60px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loadingTextStyle = css`
  color: #8a8f95;
  font-size: 14px;
`;
