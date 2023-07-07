export function getQueryParams(params: OptionalRecord<string, string | number>) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.set(key, String(value));
  });

  return `?${searchParams.toString()}`;
}

/**
 * Function to add query params to the current url
 * @param params - object of query params
 */
export const addQueryParams = (params: OptionalRecord<string, string>) => {
  const newSearch = getQueryParams(params);
  window.history.pushState(null, '', newSearch);
};
