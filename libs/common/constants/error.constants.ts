// export const MAX_ORIGINAL_OR_RENTAL_PRICE = 99999;

export const validationErrorMessages = {
  infa_0000: 'something went wrong',
  infa_0001: 'Sports name is required',
  infa_0002: 'Category name is required',
  infa_0003: 'Sport id is required',
  infa_0004: 'Title is required',
  infa_0005: 'Content is required',
  infa_0006: 'Category id is required',
  infa_0007: 'Invalid Category id',
};

export function getErrorCode(
  code: keyof typeof validationErrorMessages,
): string {
  return code;
}


export const ErrorConstants = {
  TZ__1001: {
    code: 422,
    msg: 'Something went wrong',
  },
};

type ErrorCode = keyof typeof ErrorConstants;
export function getErrorId(id: ErrorCode): ErrorCode {
  return id;
}
