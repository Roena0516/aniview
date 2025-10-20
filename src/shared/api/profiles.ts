import { createClient } from '../lib/supabase/client';
import type { Profile, ProfileUpdate } from '../model/database';

export const profilesApi = {
  /**
   * 프로필 조회
   */
  async getProfile(userId: string): Promise<Profile | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  /**
   * username으로 프로필 조회
   */
  async getProfileByUsername(username: string): Promise<Profile | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error fetching profile by username:', error);
      return null;
    }

    return data;
  },

  /**
   * 현재 로그인한 사용자의 프로필 조회
   */
  async getCurrentProfile(): Promise<Profile | null> {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    return this.getProfile(user.id);
  },

  /**
   * 프로필 업데이트
   */
  async updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }

    return data;
  },

  /**
   * username 중복 확인
   */
  async checkUsernameAvailable(username: string): Promise<boolean> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Error checking username:', error);
      return false;
    }

    return data === null;
  },
};
