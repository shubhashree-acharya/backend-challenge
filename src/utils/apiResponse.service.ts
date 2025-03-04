import { ApiResponseDto } from './apiResponse.dto';
export function ApiResponse<T>(
  status: boolean,
  data: any,
  messages: string,
): ApiResponseDto<T> {
  return {
    status,
    messages,
    data,
  };
}
