import { IsNumber, IsOptional, Min } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    FilterInvoiceDto:
 *      type: object
 *      properties:
 *        limit:
 *          type: integer
 *          description: limit
 *        page:
 *          type: integer
 *          description: page
 *        totalPrice:
 *          type: number
 *          description: location
 *
 */

export class FilterInvoiceDto {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  totalPrice?: number;
}
