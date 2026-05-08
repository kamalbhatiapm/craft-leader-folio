GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Ensure only the intended admin email has the admin role if the account exists.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'kbhatia.tech@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;