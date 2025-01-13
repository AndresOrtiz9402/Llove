export interface Request {
  (req: object, url: URL): Promise<JSON>;
}
