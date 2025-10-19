import { ReactNode } from 'react';
import { css } from '@emotion/css';

export const metadata = {
  title: 'AniView - 애니메이션 티어표',
  description: '일본 애니메이션의 티어표를 구성하고, 다른 사람과 공유할 수 있는 서비스',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <style>{globalStyles}</style>
      </head>
      <body className={bodyStyle}>{children}</body>
    </html>
  );
}

const globalStyles = `
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: "Pretendard", "Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    width: 100%;
    background: #f7f8f9;
  }

  body {
    margin: 0;
    width: 100%;
    line-height: 1.6;
    color: #000000;
    background: #ffffff;
    scrollbar-width: thin;
    scrollbar-color: #dddfe0 #ffffff;
  }

  ::selection {
    color: #ffffff;
    background: rgba(0, 0, 0, 0.5);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  b, strong {
    font-weight: 700;
  }

  i, em {
    font-style: italic;
  }

  small {
    font-size: 75%;
  }

  input, textarea, button {
    font-family: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  input[type="color"],
  input[type="date"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="email"],
  input[type="month"],
  input[type="number"],
  input[type="password"],
  input[type="search"],
  input[type="tel"],
  input[type="text"],
  input[type="time"],
  input[type="url"],
  input[type="week"],
  input:not([type]),
  textarea {
    font: inherit;
  }

  button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    border: none;
    font: inherit;
    text-align: inherit;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-left: 1px #dddfe0 dashed;
  }

  ::-webkit-scrollbar-thumb {
    background: #dddfe0;
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: #dddfe0;
  }
`;

const bodyStyle = css`
  min-height: 100vh;
`;
