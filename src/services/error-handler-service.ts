import { AxiosError, type AxiosResponse } from 'axios';

interface ServerError {
  key: string;
}

interface ErrorResponseData {
  error?: ServerError;
}
interface ErrorMessage {
  status: number;
  severity: 'error' | 'warning';
  key: string;
  message?: string;
}

class ErrorHandlerService {
  public handleError(error: AxiosError): ErrorMessage {
    if (error.response) {
      return this.handleServerError(error.response as AxiosResponse<ErrorResponseData>);
    }
    if (error.request) {
      return this.handleNoResponseError();
    }
    return this.handleRequestError();
  }

  private handleServerError(response: AxiosResponse<ErrorResponseData>): ErrorMessage {
    const status = response.status || 500;
    const key = response.data?.error?.key || this.getDefaultErrorKey(status);

    return {
      status,
      severity: 'error',
      key,
    };
  }

  private getDefaultErrorKey(status: number): string {
    const errorKeys: Record<number, string> = {
      400: 'invalidCredential',
      401: 'unauthorized',
      403: 'forbidden',
      404: 'notFound',
      500: 'serverError',
    };
    return errorKeys[status] || 'unhandled';
  }

  private handleNoResponseError(): ErrorMessage {
    return {
      status: 0,
      severity: 'error',
      key: 'noResponse',
    };
  }

  private handleRequestError(): ErrorMessage {
    return {
      status: 0,
      severity: 'warning',
      key: 'unhandled',
    };
  }
}
export const errorHandlerService = new ErrorHandlerService();
