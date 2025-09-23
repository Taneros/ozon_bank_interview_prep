/**
 * Generic typed fetch function
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Promise with typed response
 */
export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}