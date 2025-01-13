import { Http } from '@llove/backend';

type PostLetter = Http.Request;

export const httpSimplePostRequest: PostLetter = async (req, url) => {
  const res = await Http.postRequest(req, url);

  return res;
};
