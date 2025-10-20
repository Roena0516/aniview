"use client";

import { useState } from "react";
import { css } from "@emotion/css";
import { TierLevel, Anime, TierListItem } from "../../_entities/model/types";
import { mockAnimeList } from "../../_entities/model/mockData";
import { TierRow } from "./TierRow";
import { AnimeSearchPanel } from "./AnimeSearchPanel";
import { Header } from "../../../../shared/components/Header";
import { ProfileHeader } from "./ProfileHeader";

const initialTiers: TierLevel[] = ["SSS", "SS", "S", "A", "B", "C"];

export function CreatePageView() {
  const [tierListItems, setTierListItems] = useState<TierListItem[]>(
    initialTiers.map((tier) => ({ tier, animes: [] }))
  );

  const usedAnimeIds = new Set(
    tierListItems.flatMap((item) => item.animes.map((anime) => anime.id))
  );

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
    if (window.confirm("모든 티어를 초기화하시겠습니까?")) {
      setTierListItems(initialTiers.map((tier) => ({ tier, animes: [] })));
    }
  };

  return (
    <>
      <Header />
      <ProfileHeader />

      <div className={containerStyle}>
        <div className={sectionHeaderStyle}>
          <h2 className={sectionTitleStyle}>애니메이션 티어표</h2>
          <div className={sectionActionsStyle}>
            <button className={clearButtonStyle} onClick={handleClear}>
              전체 초기화
            </button>
          </div>
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
            <AnimeSearchPanel
              animes={mockAnimeList}
              usedAnimeIds={usedAnimeIds}
            />
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
