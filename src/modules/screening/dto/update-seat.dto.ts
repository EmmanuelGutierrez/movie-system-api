/**
 * @swagger
 * components:
 *  schemas:
 *    GetListScreeningDto:
 *      type: object
 *      required :
 *        - row
 *        - number
 *        - screeningId
 *        - occupied
 *      properties:
 *        row:
 *          type: integer
 *          description: row
 *
 *        number:
 *          type: integer
 *          description: number
 *
 *        occupied:
 *          type: boolean
 *          description: occupied
 *
 *        screeningId:
 *          type: string
 *          description: screeningId
 *        status:
 *          $ref: "#/components/schemas/StatusSeat"
 *
 */

import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { statusSeat } from '../../../common/constant/seat-status.enum';
import { Type } from 'class-transformer';

export class SeatPosition {
  @IsNotEmpty()
  @IsNumber()
  row!: number;

  @IsNotEmpty()
  @IsNumber()
  number!: number;
}

export class UpdateSeatDto {
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => SeatPosition)
  seatsPosition!: SeatPosition[];

  @IsNotEmpty()
  @IsString()
  screeningId!: string;

  @IsNotEmpty()
  @IsEnum(statusSeat)
  status!: statusSeat;
}
