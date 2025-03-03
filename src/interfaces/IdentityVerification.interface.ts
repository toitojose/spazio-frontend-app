export interface SanitizedFileUploaded {
  id: number;
  fileName: string;
  filePath: string;
  mimeType?: string;
  uploadedAt: string;
}

export interface FileUploadResult {
  result: boolean;
  message: string;
  error: { statusCode: number; key: string } | null;
  data?: SanitizedFileUploaded;
}

export interface IdentityUpdateResult {
  result: boolean;
  message: string;
  error: { statusCode: number; key: string } | null;
  data?: { idNumber: string };
}
