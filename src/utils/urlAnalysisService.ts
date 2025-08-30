interface UrlAnalysisResult {
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  fonts: string[];
  keywords: string[];
  confidence: number;
}

export class UrlAnalysisService {
  static async analyzeUrl(url: string): Promise<UrlAnalysisResult> {
    try {
      // Call our edge function for URL analysis
      const response = await fetch('/functions/v1/analyze-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('URL analysis error:', error);
      // Fallback to basic analysis if edge function fails
      return this.fallbackAnalysis(url);
    }
  }

  private static fallbackAnalysis(url: string): UrlAnalysisResult {
    // Basic domain-based heuristics as fallback
    const domain = new URL(url).hostname.toLowerCase();
    
    let primaryColor = '#3B82F6';
    let secondaryColor = '#10B981';
    let keywords: string[] = [];
    
    // Simple domain-based color and keyword detection
    if (domain.includes('github')) {
      primaryColor = '#24292e';
      secondaryColor = '#0366d6';
      keywords = ['developer', 'code', 'repository', 'open source'];
    } else if (domain.includes('stripe')) {
      primaryColor = '#635bff';
      secondaryColor = '#00d924';
      keywords = ['payments', 'fintech', 'business', 'api'];
    } else if (domain.includes('figma')) {
      primaryColor = '#f24e1e';
      secondaryColor = '#a259ff';
      keywords = ['design', 'collaboration', 'ui', 'creative'];
    } else if (domain.includes('notion')) {
      primaryColor = '#000000';
      secondaryColor = '#37352f';
      keywords = ['productivity', 'workspace', 'collaboration', 'notes'];
    }

    return {
      title: `Analysis of ${domain}`,
      description: `Automated analysis of ${url}`,
      primaryColor,
      secondaryColor,
      fonts: ['Inter', 'SF Pro Display'],
      keywords,
      confidence: 0.7
    };
  }
}