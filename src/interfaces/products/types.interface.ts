export interface TypeResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Type[];
}

export interface Type {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface TypeProduct {
  id: number;
  name: string;
}
