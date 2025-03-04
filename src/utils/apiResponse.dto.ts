export class ApiResponseDto<T> {
  status: boolean;
  messages: string;
  data: T;
}
