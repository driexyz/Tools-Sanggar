/**
 * Helper to resolve relative asset paths safely across both local development
 * and subfolder deployments like GitHub Pages (e.g. https://user.github.io/repo/).
 */
export const getAssetUrl = (path?: string): string => {
  if (!path) return '';
  
  // If it's already an absolute HTTP(S) URL or base64 data URI, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Remove leading slash if present so it resolves relative to base URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || './';
  const formattedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  return `${formattedBase}${cleanPath}`;
};
