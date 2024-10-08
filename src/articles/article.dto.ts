import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { getErrorCode } from 'libs/common/constants/error.constants';

@Exclude()
export class CreateArticleDto {
  @ApiProperty()
  @IsString({
    message: getErrorCode('infa_0004'),
  })
  @Expose()
  title: string;

  @ApiProperty()
  @IsString({
    message: getErrorCode('infa_0005'),
  })
  @Expose()
  content: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  description?: string;

  @ApiProperty()
  @IsString({
    message: getErrorCode('infa_0006'),
  })
  @Expose()
  category_id: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  sport_id: string;


  @ApiProperty()
  @IsOptional()
  @Expose()
  author: object;
}
