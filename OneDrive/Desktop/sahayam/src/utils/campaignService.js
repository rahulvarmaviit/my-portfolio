import { supabase } from './supabaseClient';

const campaignService = {
  // Get campaign by ID
  async getCampaignById(campaignId) {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          organizer:user_profiles(full_name, email),
          updates:campaign_updates(*)
        `)
        .eq('id', campaignId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load campaign' };
    }
  },

  // Get all active campaigns
  async getActiveCampaigns(filters = {}) {
    try {
      let query = supabase
        .from('campaigns')
        .select(`
          *,
          organizer:user_profiles(full_name, email)
        `)
        .eq('status', 'active');

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }
      
      if (filters.emergency_only) {
        query = query.eq('is_emergency', true);
      }

      // Sort by priority and created date
      query = query.order('priority', { ascending: false })
                   .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'Failed to load campaigns' };
    }
  },

  // Get campaign donations
  async getCampaignDonations(campaignId) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select(`
          *,
          donor:user_profiles(full_name, avatar_url)
        `)
        .eq('campaign_id', campaignId)
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to load donations' };
    }
  },

  // Create donation
  async createDonation(donationData) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert([{
          ...donationData,
          punyam_points_earned: Math.floor(donationData.amount / 100),
          status: 'completed' // In real app, this would be 'pending' until payment is confirmed
        }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      // Update campaign raised amount
      await this.updateCampaignRaisedAmount(donationData.campaign_id, donationData.amount);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create donation' };
    }
  },

  // Update campaign raised amount
  async updateCampaignRaisedAmount(campaignId, additionalAmount) {
    try {
      // First get current raised amount
      const { data: campaign, error: fetchError } = await supabase
        .from('campaigns')
        .select('raised_amount')
        .eq('id', campaignId)
        .single();

      if (fetchError) {
        return { success: false, error: fetchError.message };
      }

      const newRaisedAmount = (campaign.raised_amount || 0) + additionalAmount;

      const { error } = await supabase
        .from('campaigns')
        .update({ 
          raised_amount: newRaisedAmount,
          updated_at: new Date().toISOString()
        })
        .eq('id', campaignId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update campaign amount' };
    }
  },

  // Create campaign update
  async createCampaignUpdate(updateData) {
    try {
      const { data, error } = await supabase
        .from('campaign_updates')
        .insert([updateData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create campaign update' };
    }
  }
};

export default campaignService;