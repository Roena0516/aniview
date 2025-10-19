'use client';

import { css } from '@emotion/css';

export type ViewMode = 'grid' | 'list' | 'table';

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  const handleButtonClick = (mode: ViewMode) => {
    onChange(mode);
  };

  return (
    <div className={viewToggleStyle}>
      <button
        className={value === 'grid' ? viewButtonActiveStyle : viewButtonStyle}
        onClick={() => handleButtonClick('grid')}
        aria-label="그리드 뷰"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
      <button
        className={value === 'list' ? viewButtonActiveStyle : viewButtonStyle}
        onClick={() => handleButtonClick('list')}
        aria-label="리스트 뷰"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
      <button
        className={value === 'table' ? viewButtonActiveStyle : viewButtonStyle}
        onClick={() => handleButtonClick('table')}
        aria-label="테이블 뷰"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}

const viewToggleStyle = css`
  display: flex;
  gap: 8px;
`;

const viewButtonStyle = css`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #f7f8f9;
  color: #000000;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

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

const viewButtonActiveStyle = css`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #000000;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: #2a2a2a;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
