export interface Base {
  id: number;
  createAt: Date;
  deletedAt: Date;
}

export type OmitBase = 'id' | 'createAt' | 'deletedAt';
