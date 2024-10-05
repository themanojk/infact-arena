import { BadRequestException, HttpStatus } from '@nestjs/common';
import { AllExceptionFilterFilter } from './all-exception-filter.filter';
import {
  validationErrorMessages,
  getErrorCode,
} from '../../constants/error.constants';

describe('AllExceptionFilterFilter', () => {
  it('should be defined', () => {
    expect(new AllExceptionFilterFilter()).toBeDefined();
  });

  describe('catch', () => {
    const filter = new AllExceptionFilterFilter<any>();
    const mockArgumentHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    it('should not tamper with response and code when raised exception is an httpException', () => {
      expect(
        filter.catch(
          new BadRequestException({
            code: 'code-1',
            message: 'unique message',
          }),
          mockArgumentHost as any,
        ),
      ).toBeUndefined();
      expect(mockArgumentHost.switchToHttp).toHaveBeenCalledTimes(1);
      expect(mockArgumentHost.getResponse).toHaveBeenCalledTimes(1);
      expect(mockArgumentHost.status).toHaveBeenCalledTimes(1);
      expect(mockArgumentHost.status).toHaveBeenLastCalledWith(
        HttpStatus.BAD_REQUEST,
      );
      expect(mockArgumentHost.json).toHaveBeenCalledTimes(1);
      expect(mockArgumentHost.json).toHaveBeenLastCalledWith({
        message: 'unique message',
        code: 'code-1',
      });
    });

    it('should throw Internalserver error with custom message when exception is not an httpException', () => {
      expect(
        filter.catch(new Error('mock-error'), mockArgumentHost as any),
      ).toBeUndefined();
      expect(mockArgumentHost.switchToHttp).toHaveBeenCalledTimes(2);
      expect(mockArgumentHost.getResponse).toHaveBeenCalledTimes(2);
      expect(mockArgumentHost.status).toHaveBeenCalledTimes(2);
      expect(mockArgumentHost.status).toHaveBeenLastCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockArgumentHost.json).toHaveBeenCalledTimes(2);
      expect(mockArgumentHost.json).toHaveBeenLastCalledWith({
        message: validationErrorMessages.infa_0000,
        code: getErrorCode('infa_0000'),
      });
    });
  });
});
