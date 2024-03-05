import getCsrfToken from "../util/getCsrfToken";

const defaultFetchOptions = {
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getCsrfToken()
  },
  credentials: 'same-origin'
};

function getFetchOptions(options) {
  let fetchOptions;

  if(options?.method !== 'GET') {
    fetchOptions = {
      ...defaultFetchOptions,
      method: options?.method,
      body: JSON.stringify(options.body),
    }
  } else {
    fetchOptions = { ...defaultFetchOptions }
  }

  return fetchOptions;
}

export default async function makeApiRequest(uri, options = {}) {
  const fetchResponse = await fetch(uri, getFetchOptions(options));
  const responseJson = await fetchResponse.json();

  return responseJson;
}
