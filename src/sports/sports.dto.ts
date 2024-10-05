import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { getErrorCode } from 'libs/common/constants/error.constants';

@Exclude()
export class CreateSportDto {
  @ApiProperty()
  @IsString({
    message: getErrorCode('infa_0001'),
  })
  @Expose()
  name: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  description?: string;
}
