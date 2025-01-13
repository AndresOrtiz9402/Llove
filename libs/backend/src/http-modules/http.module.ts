import { Request } from '.';

export const postRequest: Request = async (req, url) => {
  const body = JSON.stringify({
    ...req,
  });

  const res = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  return res.json();
};
