export interface ImageResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: string[];
}
