interface err {
  codeClass: string;
  statusCode: number;
  message: string;
}

const createError = (statusCode: number, message: string): err => {
  const getStatusCodeClass = (status: number) => {
    return Number(String(status).charAt(0) + '00');
  };

  if (statusCode < 400 || statusCode >= 600) {
    return {
      codeClass: 'not http or server error',
      statusCode: statusCode,
      message,
    };
  }

  const isInternalErr = getStatusCodeClass(statusCode) === 500;
  const codeClass = isInternalErr ? 'Internal server error' : 'Bad Request';

  return {
    codeClass,
    statusCode,
    message,
  };
};

export default createError;
