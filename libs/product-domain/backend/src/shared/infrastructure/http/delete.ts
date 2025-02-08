export const deleteReq = async (url: string, req?: object) => {
  const body = JSON.stringify({
    ...req,
  });

  const res = await fetch(url, {
    method: 'delete',
    body,
  });

  return res.json();
};
