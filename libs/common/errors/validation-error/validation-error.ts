import { BadRequestException } from '@nestjs/common';

export class ValidationError extends BadRequestException {
  public readonly statusCode = 400;
  constructor(errors: any[]) {
    super(errors.join(', '));
    this.name = 'TrezoValidationError';
  }
}
