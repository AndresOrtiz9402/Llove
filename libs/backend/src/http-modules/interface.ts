export interface HttpRequest {
  (req: object, url: URL): Promise<JSON>;
}
