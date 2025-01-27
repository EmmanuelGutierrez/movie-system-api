import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserDto:
 *      type: object
 *      required :
 *        - name
 *        - lastName
 *        - password
 *        - email
 *      properties:
 *        name:
 *          type: string
 *        lastname:
 *          type: string
 *        password:
 *          type: string
 *        email:
 *          type: string
 *
 */

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;
}
