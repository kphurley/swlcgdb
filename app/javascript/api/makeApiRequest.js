import getCsrfToken from "../util/getCsrfToken";

export default async function makeApiRequest(uri, options = {}) {
  let fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': getCsrfToken()
    },
    credentials: 'same-origin'
  };

  if(options?.method === 'POST') {
    fetchOptions = {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(options.body),
    }
  }

  const fetchResponse = await fetch(uri, fetchOptions);
  const responseJson = await fetchResponse.json();

  return responseJson;
}
