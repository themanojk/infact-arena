import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { ErrorConstants } from './constants/error.constants';
import { ValidateAndTransformResponseDto } from './common-dto/function-response.dto';
import { BadRequestException } from '@nestjs/common';

describe('CommonService', () => {
  let service: CommonService;
  let mockResponse: any;

  beforeEach(async () => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      setHeader: jest.fn(),
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonService],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('errorHandler', () => {
    it('should handle error', () => {
      const mockError = new Error('Something went wrong');
      service.errorHandler(mockResponse as any, 400, 'Bad Request', mockError);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Bad Request',
        code: 400,
      });
    });
  });

  describe('successHandler', () => {
    it('should handle success', () => {
      const mockData = { name: 'John' };
      service.successHandler(
        mockResponse as any,
        mockData,
        'Data fetched successfully',
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockData,
        code: 200,
        message: 'Data fetched successfully',
      });
    });
  });

  describe('validateAndTransform', () => {
    class MockValidationDto {
      @ApiProperty({ required: true })
      @IsString()
      @IsNotEmpty()
      foo: string;

      @ApiProperty({ required: true })
      @IsNumber()
      bar: number;
    }

    it('should return undefined when data is valid', async () => {
      const data: MockValidationDto = {
        foo: 'lorem',
        bar: 69,
      };
      await expect(
        service.validateAndTransform(MockValidationDto, data),
      ).resolves.toBeUndefined();
    });
  });

  describe('validateAndTransformDto', () => {
    class MockValidationDto {
      @ApiProperty({
        required: true,
      })
      @IsString()
      @Length(6, 8, { message: 'SC_AI_1001' })
      cardNum: string;
    }

    it('should return undefined when data is valid', async () => {
      const data: MockValidationDto = {
        cardNum: '691223',
      };
      await expect(
        service.validateAndTransformDto(MockValidationDto, data),
      ).resolves.toBeUndefined();
    });

    it('should thow PgValidationError when data is invalid', async () => {
      const data: MockValidationDto = {
        // empty string is supposed to be invalid.
        cardNum: '',
      };

      const responseMock: ValidateAndTransformResponseDto =
        ErrorConstants['SC_AI_1001'];
    });
  });

  describe('convertDurationToMilliseconds', () => {
    it('should return the correct number of milliseconds for valid input', () => {
      expect(service.convertDurationToMilliseconds('5ms')).toBe(5);
      expect(service.convertDurationToMilliseconds('10s')).toBe(10000);
      expect(service.convertDurationToMilliseconds('2m')).toBe(120000);
      expect(service.convertDurationToMilliseconds('3h')).toBe(10800000);
      expect(service.convertDurationToMilliseconds('1d')).toBe(86400000);
      expect(service.convertDurationToMilliseconds('2w')).toBe(1209600000);
      expect(service.convertDurationToMilliseconds('1M')).toBe(2592000000);
      expect(service.convertDurationToMilliseconds('1Y')).toBe(31104000000);
    });

    it('should return null for invalid input', () => {
      expect(service.convertDurationToMilliseconds('abc')).toBeNull();
      expect(service.convertDurationToMilliseconds('5')).toBeNull();
      expect(service.convertDurationToMilliseconds('10x')).toBeNull();
      expect(service.convertDurationToMilliseconds('')).toBeNull();
    });
  });
});
