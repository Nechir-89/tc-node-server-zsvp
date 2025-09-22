export type User = {
  id?: number;
  username?: string;
  hashed_password?: string;
  password?: string;
  role_name?: string;
  email?: string;
  phone?: string;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
};
