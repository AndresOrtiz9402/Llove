export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export type OmitUserResponse = 'id' | 'name' | 'email';
