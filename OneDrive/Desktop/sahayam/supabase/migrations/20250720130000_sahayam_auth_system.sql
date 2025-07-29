-- Sahayam Crowdfunding Platform - Authentication Module Migration
-- Generated: 2025-07-20 13:00:43

-- 1. Types
CREATE TYPE public.user_role AS ENUM ('admin', 'donor', 'organizer', 'volunteer');
CREATE TYPE public.campaign_status AS ENUM ('draft', 'active', 'completed', 'paused', 'cancelled');
CREATE TYPE public.campaign_category AS ENUM ('medical', 'education', 'disaster', 'environment', 'community', 'emergency');
CREATE TYPE public.donation_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.priority_level AS ENUM ('low', 'moderate', 'urgent', 'critical');

-- 2. User Profiles Table
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'donor'::public.user_role,
    punyam_points INTEGER DEFAULT 0,
    total_donations INTEGER DEFAULT 0,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Campaigns Table
CREATE TABLE public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category public.campaign_category NOT NULL,
    status public.campaign_status DEFAULT 'draft'::public.campaign_status,
    priority public.priority_level DEFAULT 'moderate'::public.priority_level,
    goal_amount INTEGER NOT NULL,
    raised_amount INTEGER DEFAULT 0,
    beneficiary_name TEXT,
    beneficiary_age INTEGER,
    location TEXT,
    hospital TEXT,
    image_url TEXT,
    gallery_urls TEXT[],
    is_verified BOOLEAN DEFAULT false,
    is_emergency BOOLEAN DEFAULT false,
    start_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Donations Table
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    status public.donation_status DEFAULT 'pending'::public.donation_status,
    payment_id TEXT,
    punyam_points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Campaign Updates Table
CREATE TABLE public.campaign_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_campaigns_organizer_id ON public.campaigns(organizer_id);
CREATE INDEX idx_campaigns_category ON public.campaigns(category);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_campaigns_priority ON public.campaigns(priority);
CREATE INDEX idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX idx_donations_campaign_id ON public.donations(campaign_id);
CREATE INDEX idx_campaign_updates_campaign_id ON public.campaign_updates(campaign_id);

-- 7. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_updates ENABLE ROW LEVEL SECURITY;

-- 8. Helper Functions
CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT profile_user_id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.is_campaign_organizer(campaign_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.campaigns c
    WHERE c.id = campaign_uuid AND c.organizer_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_view_donation(donation_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.donations d
    JOIN public.campaigns c ON d.campaign_id = c.id
    WHERE d.id = donation_uuid 
    AND (d.donor_id = auth.uid() OR c.organizer_id = auth.uid())
)
$$;

CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role::TEXT = required_role
)
$$;

-- 9. Automatic profile creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'donor')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- 10. Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. RLS Policies
CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.is_profile_owner(id));

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (public.is_profile_owner(id))
WITH CHECK (public.is_profile_owner(id));

CREATE POLICY "public_can_view_active_campaigns"
ON public.campaigns
FOR SELECT
TO public
USING (status = 'active'::public.campaign_status);

CREATE POLICY "organizers_manage_own_campaigns"
ON public.campaigns
FOR ALL
TO authenticated
USING (public.is_campaign_organizer(id))
WITH CHECK (public.is_campaign_organizer(id));

CREATE POLICY "authenticated_can_create_campaigns"
ON public.campaigns
FOR INSERT
TO authenticated
WITH CHECK (organizer_id = auth.uid());

CREATE POLICY "public_can_view_donations"
ON public.donations
FOR SELECT
TO public
USING (NOT is_anonymous);

CREATE POLICY "donors_can_create_donations"
ON public.donations
FOR INSERT
TO authenticated
WITH CHECK (donor_id = auth.uid());

CREATE POLICY "authorized_can_view_donation_details"
ON public.donations
FOR SELECT
TO authenticated
USING (public.can_view_donation(id));

CREATE POLICY "public_can_view_campaign_updates"
ON public.campaign_updates
FOR SELECT
TO public
USING (true);

CREATE POLICY "organizers_manage_campaign_updates"
ON public.campaign_updates
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.campaigns c
        WHERE c.id = campaign_id AND c.organizer_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.campaigns c
        WHERE c.id = campaign_id AND c.organizer_id = auth.uid()
    )
);

-- 12. Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    organizer_uuid UUID := gen_random_uuid();
    donor_uuid UUID := gen_random_uuid();
    
    campaign1_uuid UUID := gen_random_uuid();
    campaign2_uuid UUID := gen_random_uuid();
    campaign3_uuid UUID := gen_random_uuid();
    campaign4_uuid UUID := gen_random_uuid();
    campaign5_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@sahayam.org', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (organizer_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'organizer@sahayam.org', crypt('organizer123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Campaign Organizer", "role": "organizer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (donor_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'donor@sahayam.org', crypt('donor123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Regular Donor", "role": "donor"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create campaigns with unique stories
    INSERT INTO public.campaigns (
        id, organizer_id, title, description, category, status, priority,
        goal_amount, raised_amount, beneficiary_name, beneficiary_age, location, hospital,
        image_url, is_verified, is_emergency, end_date
    ) VALUES
        (campaign1_uuid, organizer_uuid,
         'Help Arjun Fight Leukemia - Emergency Treatment Required',
         'Eight-year-old Arjun Kumar from a small village in Rajasthan was diagnosed with acute lymphoblastic leukemia three months ago. This brave little boy who loves drawing and dreams of becoming a teacher now faces the biggest battle of his young life. His family has exhausted their savings on initial treatments and desperately needs support to continue his life-saving chemotherapy. The treatment plan includes 6 months of intensive chemotherapy, regular blood tests, and supportive care. With proper medical care, Arjun has an excellent chance of recovery. Every donation brings hope to this courageous fighter and his family.',
         'medical', 'active', 'critical', 500000, 285000, 'Arjun Kumar', 8, 'Jaipur, Rajasthan', 'Sawai Man Singh Hospital',
         'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=800',
         true, true, '2025-08-30'),
         
        (campaign2_uuid, organizer_uuid,
         'Meera Needs Your Support for Cancer Treatment',
         'Forty-five-year-old Meera Sharma, a dedicated school teacher and mother of two, was diagnosed with stage 2 breast cancer six weeks ago. Known for her selfless dedication to educating underprivileged children in her community, Meera now needs the communitys support in her fight against cancer. Her treatment plan includes surgery, chemotherapy, and radiation therapy. The family has used up their savings and taken loans, but still faces a significant financial gap. Meera is determined to beat cancer and return to teaching the children she loves. Your donation will help cover her medical expenses and give her the fighting chance she deserves.',
         'medical', 'active', 'urgent', 400000, 180000, 'Meera Sharma', 45, 'Delhi, NCR', 'AIIMS Delhi',
         'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800',
         true, false, '2025-09-15'),
         
        (campaign3_uuid, organizer_uuid,
         'Help Ravi Walk Again - Spinal Cord Injury Recovery',
         'Twenty-five-year-old Ravi Kumar, a promising software engineer, suffered severe spinal injuries in a road accident while returning from work. The accident has left him with limited mobility, but doctors are optimistic about his recovery with proper treatment and rehabilitation. Ravi was the sole breadwinner for his family, including his elderly parents and younger sister who is pursuing her medical degree. The treatment involves complex spine surgery followed by months of intensive physiotherapy. Despite the challenges, Ravi remains positive and determined to walk again. His family has spent their life savings and needs urgent financial assistance to continue his treatment.',
         'medical', 'active', 'urgent', 600000, 320000, 'Ravi Kumar', 25, 'Bangalore, Karnataka', 'Manipal Hospital',
         'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
         true, false, '2025-08-20'),
         
        (campaign4_uuid, organizer_uuid,
         'Anita Needs a Kidney Transplant to Survive',
         'Fifty-two-year-old Anita Devi has been battling chronic kidney disease for three years. Despite following all medical advice and treatments, her condition has deteriorated to the point where she needs an immediate kidney transplant. A matching donor has been found within her family - her younger brother has volunteered to donate his kidney. However, the family cannot afford the expensive transplant procedure. Anita is a devoted mother of three and a beloved member of her community who has always helped others in need. Now, she needs the communities support to get the life-saving transplant that will allow her to continue caring for her family.',
         'medical', 'active', 'critical', 1200000, 280000, 'Anita Devi', 52, 'Chennai, Tamil Nadu', 'Apollo Hospital',
         'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800',
         true, true, '2025-08-10'),
         
        (campaign5_uuid, organizer_uuid,
         'Emergency Brain Surgery for Young Father Vikram',
         'Thirty-five-year-old Vikram Singh, a loving father of two young children, was rushed to the hospital after experiencing severe headaches and seizures. Medical scans revealed a brain tumor that requires immediate surgical intervention. Vikram works as a mechanic and has always been the pillar of strength for his family. The complex brain surgery is expensive and beyond the familys financial means. His wife is now juggling between caring for their children and being by his side at the hospital. The doctors are optimistic about the surgery outcome if performed soon. Time is crucial, and every donation counts towards giving Vikram a chance to return to his children healthy and strong.',
         'medical', 'active', 'critical', 900000, 150000, 'Vikram Singh', 35, 'Hyderabad, Telangana', 'Yashoda Hospital',
         'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800',
         true, true, '2025-08-08');

    -- Create campaign updates
    INSERT INTO public.campaign_updates (campaign_id, title, content, image_url) VALUES
        (campaign1_uuid, 'Chemotherapy Session 4 Completed Successfully',
         'Arjun completed his 4th chemotherapy session today. The doctors are very pleased with his progress. His blood counts are improving and he is responding well to treatment. Thank you to all donors for making this possible!',
         'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600'),
        (campaign1_uuid, 'Halfway Through Treatment - Great Progress!',
         'We have reached the halfway mark in Arjuns treatment journey. The oncology team reports excellent response to chemotherapy. Arjuns spirits are high and he has been drawing pictures for all the donors who have supported him.',
         'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600'),
         
        (campaign2_uuid, 'Surgery Scheduled for Next Week',
         'Meeras surgery has been scheduled for next Tuesday. The medical team is confident about the procedure. Meera is in good spirits and grateful for all the support she has received.',
         'https://images.pexels.com/photos/4386398/pexels-photo-4386398.jpeg?auto=compress&cs=tinysrgb&w=600'),
         
        (campaign3_uuid, 'Spine Surgery Successful - Recovery Begins',
         'Ravis spine surgery was completed successfully yesterday. The doctors are optimistic about his recovery. He will begin physiotherapy next week. Thank you for your continued support.',
         'https://images.pexels.com/photos/4386445/pexels-photo-4386445.jpeg?auto=compress&cs=tinysrgb&w=600'),
         
        (campaign4_uuid, 'Compatible Donor Confirmed - Surgery Scheduled',
         'Great news! Anitas brother has been confirmed as a compatible donor. The transplant surgery has been scheduled for next month. We are getting closer to saving her life.',
         null),
         
        (campaign5_uuid, 'Pre-Surgery Tests Completed',
         'All pre-surgery tests have been completed and Vikram is cleared for the brain surgery. The neurosurgeon is confident about the procedure. Surgery is scheduled for this Friday.',
         null);

    -- Create donations
    INSERT INTO public.donations (donor_id, campaign_id, amount, message, is_anonymous, status, punyam_points_earned) VALUES
        (donor_uuid, campaign1_uuid, 5000, 'Stay strong Arjun! You are a brave warrior.', false, 'completed', 50),
        (null, campaign1_uuid, 10000, 'Hope this helps with the treatment. Get well soon little champion!', true, 'completed', 0),
        (donor_uuid, campaign2_uuid, 7500, 'As a teacher myself, my heart goes out to Meera. Wishing her complete recovery.', false, 'completed', 75),
        (null, campaign2_uuid, 15000, 'Keep fighting brave lady! We are all rooting for you.', true, 'completed', 0),
        (donor_uuid, campaign3_uuid, 12000, 'Hope this helps Ravi walk again. Sending prayers for speedy recovery.', false, 'completed', 120),
        (donor_uuid, campaign4_uuid, 20000, 'Every person deserves a chance at life. Hope this helps Anita get her transplant.', false, 'completed', 200),
        (donor_uuid, campaign5_uuid, 8000, 'Praying for successful surgery. Stay strong Vikram!', false, 'completed', 80);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;