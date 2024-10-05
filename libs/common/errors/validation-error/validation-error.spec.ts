import { ValidationError } from './validation-error';

describe('ValidationError', () => {
  it('should be defined', () => {
    expect(new ValidationError([])).toBeDefined();
  });
});
