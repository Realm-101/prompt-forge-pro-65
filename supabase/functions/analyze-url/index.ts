import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UrlAnalysisResult {
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  fonts: string[];
  keywords: string[];
  confidence: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Analyzing URL: ${url}`);

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PromptForge/1.0; +https://promptforge.dev)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const analysis = analyzeHtml(html, url);

    console.log(`Analysis complete for ${url}:`, analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-url function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function analyzeHtml(html: string, url: string): UrlAnalysisResult {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : extractDomainName(url);

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const description = descMatch ? descMatch[1].trim() : `Website analysis for ${extractDomainName(url)}`;

  // Extract colors from CSS
  const colors = extractColors(html);
  
  // Extract fonts
  const fonts = extractFonts(html);
  
  // Extract keywords
  const keywords = extractKeywords(html, url);

  return {
    title,
    description,
    primaryColor: colors.primary,
    secondaryColor: colors.secondary,
    fonts,
    keywords,
    confidence: 0.85
  };
}

function extractColors(html: string): { primary: string; secondary: string } {
  const colorRegex = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;
  const rgbRegex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
  const hslRegex = /hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/g;

  const colors: string[] = [];
  
  // Extract hex colors
  let match;
  while ((match = colorRegex.exec(html)) !== null) {
    colors.push('#' + match[1]);
  }
  
  // Extract RGB colors and convert to hex
  while ((match = rgbRegex.exec(html)) !== null) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    colors.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
  }

  // Filter out common defaults and very light/dark colors
  const filteredColors = colors.filter(color => {
    if (color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#000000') return false;
    if (color.toLowerCase() === '#fff' || color.toLowerCase() === '#000') return false;
    return true;
  });

  // Use most common non-default colors, or fallback to defaults
  const primary = filteredColors[0] || '#3B82F6';
  const secondary = filteredColors[1] || '#10B981';

  return { primary, secondary };
}

function extractFonts(html: string): string[] {
  const fontRegex = /font-family\s*:\s*([^;}]+)/gi;
  const fonts = new Set<string>();
  
  let match;
  while ((match = fontRegex.exec(html)) !== null) {
    const fontFamily = match[1].trim();
    // Clean up font names
    const cleanFonts = fontFamily.split(',').map(f => 
      f.trim().replace(/["']/g, '').replace(/\s+/g, ' ')
    );
    cleanFonts.forEach(font => {
      if (!font.toLowerCase().includes('serif') && 
          !font.toLowerCase().includes('sans-serif') && 
          !font.toLowerCase().includes('monospace') &&
          font.length > 2) {
        fonts.add(font);
      }
    });
  }

  const fontArray = Array.from(fonts).slice(0, 3);
  return fontArray.length > 0 ? fontArray : ['Inter', 'SF Pro Display'];
}

function extractKeywords(html: string, url: string): string[] {
  const keywords = new Set<string>();
  
  // Extract from meta keywords
  const metaKeywords = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i);
  if (metaKeywords) {
    metaKeywords[1].split(',').forEach(k => keywords.add(k.trim().toLowerCase()));
  }
  
  // Extract from common text patterns
  const textContent = html.replace(/<[^>]*>/g, ' ').toLowerCase();
  
  // Technology keywords
  const techKeywords = ['react', 'vue', 'angular', 'javascript', 'typescript', 'api', 'database', 'cloud', 'ai', 'ml', 'saas', 'productivity', 'automation', 'analytics', 'dashboard', 'workflow'];
  techKeywords.forEach(keyword => {
    if (textContent.includes(keyword)) {
      keywords.add(keyword);
    }
  });
  
  // Business keywords
  const businessKeywords = ['business', 'enterprise', 'startup', 'growth', 'marketing', 'sales', 'customer', 'service', 'platform', 'solution'];
  businessKeywords.forEach(keyword => {
    if (textContent.includes(keyword)) {
      keywords.add(keyword);
    }
  });

  // Domain-based keywords
  const domain = extractDomainName(url).toLowerCase();
  if (domain.includes('github')) keywords.add('developer');
  if (domain.includes('design')) keywords.add('design');
  if (domain.includes('pay') || domain.includes('stripe')) keywords.add('payments');
  
  return Array.from(keywords).slice(0, 8);
}

function extractDomainName(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'website';
  }
}