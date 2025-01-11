import { Http } from '@llove/backend';

type PostLetter = Http.HttpRequest;

export const postLetter: PostLetter = async (req, url) => {
  const res = await Http.request(req, url);

  return res;
};
