-- Create projects table for storing project configurations
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID, -- Will reference auth.users when authentication is implemented
  name TEXT NOT NULL,
  domain TEXT,
  description TEXT,
  primary_goal TEXT,
  source_url TEXT,
  component_urls TEXT[] DEFAULT '{}',
  uploaded_files JSONB DEFAULT '[]',
  url_analysis JSONB,
  config_yaml TEXT, -- Store the generated YAML configuration
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies (currently allowing all operations for development)
-- These should be updated when authentication is implemented
CREATE POLICY "Allow all operations on projects" 
ON public.projects 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();