export enum OrderValues {
  ASC = 'ASC',
  DESC = 'DESC',
}

type Filter<Entity> = {
  [P in keyof Partial<Entity>]: Entity[P];
};
type Limit = number;
type Page = number;
type Sort<Entity> = { [P in keyof Partial<Entity>]: OrderValues };

export interface QueryObj<Entity> {
  filter: Filter<Entity>;
  limit: Limit;
  page: Page;
  relations: string[];
  sort: Sort<Entity>;
}
