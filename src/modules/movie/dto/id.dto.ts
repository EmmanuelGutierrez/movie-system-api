import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../common/utils/IsObjectId';

/**
 * @swagger
 * components:
 *  schemas:
 *    IdDto:
 *      type: object
 *      required:
 *        -id
 *      properties:
 *        id:
 *          type: string
 *          description: id
 */
export class IdDto {
  @IsNotEmpty()
  @Validate(IsObjectId)
  id!: string;
}
