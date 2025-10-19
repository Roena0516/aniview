import { redirect } from 'next/navigation';

export default function HomePage() {
  // 기본 사용자 ID로 리다이렉트
  redirect('/profile/guest/create');
}
