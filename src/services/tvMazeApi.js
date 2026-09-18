const BASE_URL = 'https://api.tvmaze.com';

// Fallback high-resolution cinema placeholder image
export const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';

export const FALLBACK_BACKDROP =
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80';

/**
 * Fetch initial list of all shows from TVMaze
 * Endpoint: GET /shows
 */
export async function getShows() {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows. Server responded with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shows from TVMaze API:', error);
    throw error;
  }
}

/**
 * Search for TV shows by title query
 * Endpoint: GET /search/shows?q=:query
 */
export async function searchShows(query) {
  if (!query || query.trim() === '') {
    return getShows();
  }

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`);
    if (!response.ok) {
      throw new Error(`Failed to search shows. Server responded with status ${response.status}`);
    }
    const results = await response.json();
    return results.map((item) => item.show);
  } catch (error) {
    console.error('Error searching shows on TVMaze API:', error);
    throw error;
  }
}

/**
 * Clean HTML string returned by TVMaze API description
 */
export function stripHtml(html) {
  if (!html) return 'No description available for this show.';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Extract 4-digit release year from premiered date string
 */
export function getReleaseYear(premiered) {
  if (!premiered) return 'N/A';
  const match = premiered.match(/^\d{4}/);
  return match ? match[0] : premiered;
}

/**
 * Format rating with star
 */
export function formatRating(rating) {
  if (!rating || rating.average === null || rating.average === undefined) {
    return 'N/A';
  }
  return Number(rating.average).toFixed(1);
}
