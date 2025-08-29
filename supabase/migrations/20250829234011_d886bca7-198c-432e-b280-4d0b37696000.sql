-- Create storage buckets for project uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('project-documents', 'project-documents', false),
  ('project-images', 'project-images', true);

-- Create policies for project documents (private)
CREATE POLICY "Users can upload their own project documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own project documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own project documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policies for project images (public)
CREATE POLICY "Anyone can view project images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-images');

CREATE POLICY "Users can upload their own project images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own project images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-images' AND auth.uid()::text = (storage.foldername(name))[1]);