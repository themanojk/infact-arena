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
export class CreateCategoryDto {
  @ApiProperty()
  @IsString({
    message: getErrorCode('infa_0002'),
  })
  @Expose()
  category_name: string;

  @ApiProperty()
  @IsString({
    message: getErrorCode('infa_0003'),
  })
  @Expose()
  sport_id: string;


  @ApiProperty()
  @IsOptional()
  @IsString({
    message: getErrorCode('infa_0002'),
  })
  @Expose()
  parent_id: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  description?: string;
}
