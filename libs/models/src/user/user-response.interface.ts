export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export type IOmitUserDto = 'id' | 'name' | 'email';
