export const post = async (req: object, url: string): Promise<JSON> => {
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
