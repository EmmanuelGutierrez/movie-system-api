import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SeatsI } from '../../theater/interface/seats.interface';

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateInvoiceDto:
 *      type: object
 *      required :
 *        - screeningId
 *        - userId
 *        - seats
 *        - status
 *        - totalPrice
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        screeningId:
 *          type: string
 *        userId:
 *          type: string
 *        seats:
 *          type: array
 *          description: seats
 *          items:
 *            $ref: '#/components/schemas/Seat'
 *        totalPrice:
 *          type: number
 *          description: price
 *        createdAt:
 *          type: integer
 *          description: release
 *        updatedAt:
 *          type: integer
 *          description: release
 *
 *
 */

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  screeningId!: string;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  seats!: SeatsI[];

  @IsNotEmpty()
  @IsNumber()
  totalPrice!: number;

  @IsNotEmpty()
  @IsNumber()
  status!: string;
}
