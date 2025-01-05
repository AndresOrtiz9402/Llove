export interface IBase {
  id: number;
  createAt: Date;
  deletedAt: Date;
}

export type IOmitBase = 'id' | 'createAt' | 'deletedAt';
