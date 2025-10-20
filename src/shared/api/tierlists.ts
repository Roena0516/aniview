import { createClient } from '../lib/supabase/client';
import type { Tierlist, TierlistInsert, TierlistUpdate } from '../model/database';

export const tierlistsApi = {
  /**
   * 티어표 목록 조회 (특정 사용자)
   */
  async getTierlistsByUserId(userId: string): Promise<Tierlist[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tierlists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tierlists:', error);
      return [];
    }

    return data || [];
  },

  /**
   * 티어표 단일 조회
   */
  async getTierlist(tierlistId: string): Promise<Tierlist | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tierlists')
      .select('*')
      .eq('id', tierlistId)
      .single();

    if (error) {
      console.error('Error fetching tierlist:', error);
      return null;
    }

    return data;
  },

  /**
   * 티어표 생성
   */
  async createTierlist(tierlist: TierlistInsert): Promise<Tierlist | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tierlists')
      .insert(tierlist)
      .select()
      .single();

    if (error) {
      console.error('Error creating tierlist:', error);
      return null;
    }

    return data;
  },

  /**
   * 티어표 업데이트
   */
  async updateTierlist(
    tierlistId: string,
    updates: TierlistUpdate
  ): Promise<Tierlist | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tierlists')
      .update(updates)
      .eq('id', tierlistId)
      .select()
      .single();

    if (error) {
      console.error('Error updating tierlist:', error);
      return null;
    }

    return data;
  },

  /**
   * 티어표 삭제
   */
  async deleteTierlist(tierlistId: string): Promise<boolean> {
    const supabase = createClient();

    const { error } = await supabase
      .from('tierlists')
      .delete()
      .eq('id', tierlistId);

    if (error) {
      console.error('Error deleting tierlist:', error);
      return false;
    }

    return true;
  },

  /**
   * 조회수 증가
   */
  async incrementViewCount(tierlistId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.rpc('increment_view_count', {
      tierlist_id: tierlistId,
    });

    if (error) {
      console.error('Error incrementing view count:', error);
    }
  },

  /**
   * 모든 티어표 조회 (갤러리용)
   */
  async getAllTierlists(limit: number = 50): Promise<Tierlist[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tierlists')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching all tierlists:', error);
      return [];
    }

    return data || [];
  },
};
