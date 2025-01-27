import { IsEnum, IsNotEmpty } from "class-validator";
import { roles } from "../../../../common/constant/role.enum";


/**
 * @swagger
 * components:
 *  schemas:
 *    CreateRoleDto:
 *      type: object
 *      required :
 *        - type
 *      properties:
 *        type:
 *          type: string
 *          enum:
 *            - user
 *            - admin
 *          description: role type
 *      
 */

export class CreateRoleDto {
  @IsEnum(roles)
  @IsNotEmpty()
  readonly type!: roles;
}