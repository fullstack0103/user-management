/**
 * Function to check URL
 * @param {string} url URL
 */
export const checkSiteUrl = (url: string) => {
  if (url.includes('https://')) {
    return url;
  }
  return `https://${url}`;
};
