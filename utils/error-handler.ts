import { Alert } from 'react-native';

export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode?: number;
  public readonly originalError?: any;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    statusCode?: number,
    originalError?: any,
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.originalError = originalError;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

const getUserFriendlyMessage = (error: AppError): string => {
  switch (error.type) {
    case ErrorType.NETWORK:
      return '네트워크 연결을 확인해주세요.';
    case ErrorType.AUTH:
      return '로그인이 필요합니다. 다시 로그인해주세요.';
    case ErrorType.VALIDATION:
      return error.message || '입력 정보를 확인해주세요.';
    case ErrorType.SERVER:
      return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return error.message || '알 수 없는 오류가 발생했습니다.';
  }
};

export const handleError = (error: any, context?: string): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error?.response) {
    // Axios 에러
    const status = error.response.status;
    const message = error.response.data?.message || error.message;

    if (status >= 500) {
      return new AppError(message, ErrorType.SERVER, status, error);
    }
    if (status === 401 || status === 403) {
      return new AppError(message, ErrorType.AUTH, status, error);
    }
    if (status === 400 || status === 409) {
      return new AppError(message, ErrorType.VALIDATION, status, error);
    }
    return new AppError(message, ErrorType.UNKNOWN, status, error);
  }

  if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('Network')) {
    return new AppError(
      '네트워크 오류가 발생했습니다.',
      ErrorType.NETWORK,
      undefined,
      error,
    );
  }

  if (error instanceof Error) {
    return new AppError(error.message, ErrorType.UNKNOWN, undefined, error);
  }

  return new AppError(
    '알 수 없는 오류가 발생했습니다.',
    ErrorType.UNKNOWN,
    undefined,
    error,
  );
};

export const showErrorAlert = (
  error: any,
  context?: string,
  title: string = '오류',
): void => {
  const appError = handleError(error, context);
  const message = getUserFriendlyMessage(appError);

  console.error(
    `[${context || 'UNKNOWN'}] ${appError.type} Error:`,
    appError.originalError || error,
  );

  Alert.alert(title, message);
};

export const showErrorAlertWithCallback = (
  error: any,
  callback: () => void,
  context?: string,
  title: string = '오류',
): void => {
  const appError = handleError(error, context);
  const message = getUserFriendlyMessage(appError);

  console.error(
    `[${context || 'UNKNOWN'}] ${appError.type} Error:`,
    appError.originalError || error,
  );

  Alert.alert(title, message, [
    {
      text: '확인',
      onPress: callback,
    },
  ]);
};
