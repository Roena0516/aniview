'use client';

import { css } from '@emotion/css';

export function Header() {
  return (
    <header className={headerStyle}>
      <div className={containerStyle}>
        <div className={navStyle}>
          <a
            role="button"
            href="/"
            className={homeButtonStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
            </svg>
          </a>
          <a
            role="button"
            href="/gallery"
            className={galleryButtonStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            갤러리
          </a>
        </div>
      </div>
    </header>
  );
}

const headerStyle = css`
  width: 100%;
  height: 72px;
  background-color: #ffffff;
  color: #000000;
  border-bottom: 1px solid #dddfe0;
`;

const containerStyle = css`
  max-width: 1200px;
  padding: 0 16px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const navStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const homeButtonStyle = css`
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(247, 248, 249, 0);
  color: #000000;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 9999px;
  width: 48px;
  height: 48px;
  padding: 0;

  &:hover {
    background: #dadfe3;
    box-shadow: rgba(218, 223, 227, 0.4) 0px 4px 8px;
    transform: translate(0, -4px);
  }

  &:active {
    box-shadow: rgba(218, 223, 227, 0.4) 0px 2px 4px;
    transform: translate(0, -2px);
  }
`;

const galleryButtonStyle = css`
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  background: #f7f8f9;
  color: #000000;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;

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
