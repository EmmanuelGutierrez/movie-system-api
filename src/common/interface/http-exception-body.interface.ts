export type HttpExceptionBodyMessage = string | string[] | (Body & number);

export interface HttpExceptionBody {
  message?: HttpExceptionBodyMessage;
  error?: string;
  statusCode?: number;
}
