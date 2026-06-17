-- Drop the insecure policy
DROP POLICY IF EXISTS "bookings_public_insert" ON bookings;

-- Create a secure policy with validation
CREATE POLICY "bookings_public_insert" ON bookings FOR INSERT
  TO public WITH CHECK (
    -- Validate required fields are present and have reasonable length
    client_name IS NOT NULL 
    AND length(trim(client_name)) >= 2 
    AND length(client_name) <= 100
    AND client_phone IS NOT NULL 
    AND length(client_phone) >= 10 
    AND length(client_phone) <= 20
    -- Validate activity type is provided
    AND activity_type IS NOT NULL 
    AND length(activity_type) > 0
    -- Validate date is not in the past
    AND preferred_date >= CURRENT_DATE
    -- Validate duration is reasonable (1-24 hours)
    AND duration_hours >= 1 
    AND duration_hours <= 24
    -- Validate companion exists and is available
    AND EXISTS (
      SELECT 1 FROM companions 
      WHERE companions.id = bookings.companion_id 
      AND companions.is_available = true
    )
  );