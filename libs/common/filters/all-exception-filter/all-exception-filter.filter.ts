import {
  getErrorCode,
  validationErrorMessages,
} from '../../constants/error.constants';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const resp = exception.getResponse();
      host.switchToHttp().getResponse<Response>().status(status).json({
        data: resp['data'],
        message: resp['message'],
        code: resp['code'],
      });
      return;
    }

    Logger.error(
      'error which is not the type of HttpException is thrown.',
      {
        error: exception.toString(),
      },
    );

    host
      .switchToHttp()
      .getResponse<Response>()
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: validationErrorMessages.infa_0000,
        code: getErrorCode('infa_0000'),
      });
  }
}
