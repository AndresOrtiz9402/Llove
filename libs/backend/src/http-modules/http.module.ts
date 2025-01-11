import { HttpRequest } from '.';

export const request: HttpRequest = async (req, url) => {
  const res = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...req,
    }),
  });

  return res.json();
};
