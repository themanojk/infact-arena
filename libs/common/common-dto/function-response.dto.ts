export class funResponseSchema {
  status: boolean;
  code?: number;
  msg?: string;
  data?: any;
}
export class ValidateAndTransformResponseDto {
  code: number;
  msg: string;
}
export interface CommonFindResponseDTO<T> {
  total?: number;
  skip?: number;
  limit?: number;
  data: T[];
}

export interface CommonResponseDTO {
  data: any;
  code?: number;
  msg?: string;
}
