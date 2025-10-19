'use client';

import { css } from '@emotion/css';

export function Header() {
  return (
    <header className={headerStyle}>
      <div className={containerStyle}>
        <div className={navStyle}>
          <a
            role="button"
            href="/gallery"
            className={iconButtonStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </a>
        </div>
        <div className={navStyle}>
          <a
            role="button"
            href="/profile/guest/create"
            className={iconButtonStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
            </svg>
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

const iconButtonStyle = css`
  text-decoration: none;
  cursor: pointer;
  user-select: none;
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

  svg {
    width: 24px;
    height: 24px;
  }
`;
