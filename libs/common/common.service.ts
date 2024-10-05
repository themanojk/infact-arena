import { Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from './errors/validation-error/validation-error';
import { Response } from 'express';
import { ErrorConstants } from './constants/error.constants';
import { ValidateAndTransformResponseDto } from './common-dto/function-response.dto';
@Injectable()
export class CommonService {
  errorHandler(res: Response, statusCode: number, msg: string, err?: any) {
    try {
      res.status(statusCode).json({
        message: msg,
        code: statusCode,
      });
    } catch (err) {
      res.status(422).json({
        message: 'Something went wrong',
        code: 422,
      });
    }
  }

  successHandler(res: Response, data: object, msg: string = 'success') {
    try {
      res.status(200).json({
        data,
        code: 200,
        message: msg,
      });
    } catch (err) {
      res.status(200).json({});
    }
  }

  async validateAndTransform<T extends Record<string, any>>(
    dtoClass: new () => T,
    inputDto: T,
  ) {
    const validatedDto = plainToClass(dtoClass, inputDto);
    const errors = await validate(validatedDto);

    console.log(validatedDto)
      console.log(errors)

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return;
  }

  async validateAndTransformDto<T extends Record<string, any>>(
    dtoClass: new () => T,
    inputDto: T,
  ): Promise<ValidateAndTransformResponseDto | undefined> {
    try {
      for (const key in inputDto) {
        if (typeof inputDto[key] === 'string') {
          inputDto[key] = inputDto[key].trim();
        }
      }
      const validatedDto = plainToClass(dtoClass, inputDto);
      const errors = await validate(validatedDto);

      if (errors.length > 0) {
        const firstErrorConstraints = errors[0].constraints;
        const errorConstraintsKeys = Object.keys(firstErrorConstraints);
        return ErrorConstants[
          firstErrorConstraints[errorConstraintsKeys[0]].toString()
        ];
      }

      return;
    } catch (err) {
      return ErrorConstants['TZ__1001'];
    }
  }

  createResponseStructure(
    data: any,
    message?: string,
    code?: string,
    isError?: boolean,
  ) {
    return {
      data: isError
        ? null
        : {
            items: data,
          },
      message,
      code,
    };
  }


  convertDurationToMilliseconds(duration: string): number | null {
    const timeUnitToMs = {
      ms(val: number): number {
        return val;
      },
      s(val: number): number {
        return 1000 * timeUnitToMs.ms(val);
      },
      m(val: number): number {
        return 60 * timeUnitToMs.s(val);
      },
      h(val: number): number {
        return 60 * timeUnitToMs.m(val);
      },
      d(val: number): number {
        return 24 * timeUnitToMs.h(val);
      },
      w(val: number): number {
        return 7 * timeUnitToMs.d(val);
      },
      M(val: number): number {
        return 30 * timeUnitToMs.d(val);
      },
      Y(val: number): number {
        return 12 * timeUnitToMs.M(val);
      },
    };
    const match = /^(?<value>\d+)(?<units>\w+)$/.exec(duration);
    if (!match?.groups) {
      return null;
    }

    const { value, units } = match.groups;
    const numericVal = parseInt(value);
    if (isNaN(numericVal)) {
      return null;
    }
    const converterFn = timeUnitToMs[units];
    if (!converterFn) {
      return null;
    }
    return converterFn(numericVal);
  }
  commonErrorMsg(errorCode: string) {
    return ErrorConstants[errorCode].msg;
  }
}
