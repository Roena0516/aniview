-- ============================================
-- AniView Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Profiles Table (유저 정보)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  favorite_anime TEXT,
  rating INTEGER DEFAULT 0,
  tier_list_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
-- 모든 사용자는 프로필을 조회할 수 있음
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- 사용자는 자신의 프로필만 생성할 수 있음
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 사용자는 자신의 프로필만 수정할 수 있음
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- Tierlists Table (티어표)
-- ============================================
CREATE TABLE IF NOT EXISTS tierlists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tiers JSONB NOT NULL,
  thumbnail TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tierlists ENABLE ROW LEVEL SECURITY;

-- Tierlists RLS Policies
-- 모든 사용자는 티어표를 조회할 수 있음
CREATE POLICY "Tierlists are viewable by everyone"
  ON tierlists FOR SELECT
  USING (true);

-- 사용자는 자신의 티어표만 생성할 수 있음
CREATE POLICY "Users can insert their own tierlist"
  ON tierlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 티어표만 수정할 수 있음
CREATE POLICY "Users can update their own tierlist"
  ON tierlists FOR UPDATE
  USING (auth.uid() = user_id);

-- 사용자는 자신의 티어표만 삭제할 수 있음
CREATE POLICY "Users can delete their own tierlist"
  ON tierlists FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- Indexes (성능 최적화)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_tierlists_user_id ON tierlists(user_id);
CREATE INDEX IF NOT EXISTS idx_tierlists_created_at ON tierlists(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- ============================================
-- Functions (자동 업데이트)
-- ============================================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Profiles updated_at 트리거
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Tierlists updated_at 트리거
CREATE TRIGGER update_tierlists_updated_at
  BEFORE UPDATE ON tierlists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Functions (티어표 개수 업데이트)
-- ============================================

-- 티어표 생성 시 tier_list_count 증가
CREATE OR REPLACE FUNCTION increment_tier_list_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET tier_list_count = tier_list_count + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_tier_list_count_trigger
  AFTER INSERT ON tierlists
  FOR EACH ROW
  EXECUTE FUNCTION increment_tier_list_count();

-- 티어표 삭제 시 tier_list_count 감소
CREATE OR REPLACE FUNCTION decrement_tier_list_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET tier_list_count = tier_list_count - 1
  WHERE id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_tier_list_count_trigger
  AFTER DELETE ON tierlists
  FOR EACH ROW
  EXECUTE FUNCTION decrement_tier_list_count();

-- ============================================
-- 신규 사용자 자동 프로필 생성
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    SPLIT_PART(NEW.email, '@', 1)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 사용자 가입 시 프로필 자동 생성 트리거
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- Functions (조회수 증가)
-- ============================================
CREATE OR REPLACE FUNCTION increment_view_count(tierlist_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE tierlists
  SET view_count = view_count + 1
  WHERE id = tierlist_id;
END;
$$ LANGUAGE plpgsql;
