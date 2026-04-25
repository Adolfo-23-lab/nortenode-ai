-- Update agency org owner_contact_email to professional address.
-- Migrates from Gmail (nortenode.ia@gmail.com) to Zoho-hosted
-- contacto@nortenode.com. Notifications-dispatcher reads this field
-- to determine the recipient of lead notifications via Resend.

UPDATE public.organizations
SET    owner_contact_email = 'contacto@nortenode.com'
WHERE  slug = 'nortenode-ai';
