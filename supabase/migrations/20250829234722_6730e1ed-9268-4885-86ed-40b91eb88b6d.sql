-- Fix storage policies to allow temporary uploads without authentication
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can upload their own project documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own project documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own project documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own project images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own project images" ON storage.objects;

-- Create temporary policies that allow anonymous uploads to temp folder
CREATE POLICY "Allow temporary document uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-documents' AND (storage.foldername(name))[1] = 'temp');

CREATE POLICY "Allow viewing temporary documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-documents' AND (storage.foldername(name))[1] = 'temp');

CREATE POLICY "Allow deleting temporary documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-documents' AND (storage.foldername(name))[1] = 'temp');

-- Create temporary policies for images
CREATE POLICY "Allow temporary image uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-images' AND (storage.foldername(name))[1] = 'temp');

CREATE POLICY "Allow deleting temporary images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-images' AND (storage.foldername(name))[1] = 'temp');