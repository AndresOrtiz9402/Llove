export const patch = async (url: string, req: object): Promise<JSON> => {
  const body = JSON.stringify({
    ...req,
  });

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  return res.json();
};
