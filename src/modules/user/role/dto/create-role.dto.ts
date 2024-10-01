import { IsEnum, IsNotEmpty } from "class-validator";
import roles from "../../../../common/constant/role.enum";

export class CreateRoleDto {
  @IsEnum(roles)
  @IsNotEmpty()
  readonly type!: roles;
}