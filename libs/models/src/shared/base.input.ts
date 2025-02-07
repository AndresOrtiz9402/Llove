import { type OmitBaseEntity } from '.';

export type CreateInput<Entity> = Omit<Entity, OmitBaseEntity>;
export type UpdateInput<Entity> = Partial<CreateInput<Entity>>;
