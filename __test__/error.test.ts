import { createError } from '../src/controller/index';

describe('If errors func creats properly', () => {
  test('returns object', () => {
    const err = createError(401, 'foo');
    expect(typeof err).toBe('object');
  });

  test('returns err with code class and status of error and message', () => {
    const err = createError(401, 'foo');
    const properResult = {
      codeClass: 'Bad Request',
      statusCode: 401,
      message: 'foo',
    };
    expect(err).toEqual(properResult);
  });

  test('err 201 _ singals if params is inccorect', () => {
    const err = createError(201, 'foo');
    expect(err.codeClass).toBe('not http or server error');
  });

  test('500 _ error on the server side', () => {
    const err = createError(500, 'foo');
    expect(err.codeClass).toBe('Internal server error');
  });

  test('601 _ singals if params is inccorect', () => {
    const err = createError(601, 'foo');
    expect(err.codeClass).toBe('not http or server error');
  });
});
