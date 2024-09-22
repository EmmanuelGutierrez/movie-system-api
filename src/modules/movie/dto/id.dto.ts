import { IsNotEmpty, IsString, Validate  } from 'class-validator';
import { IsObjectId } from '../../../common/utils/IsObjectId';

export class IdDto {
  @IsNotEmpty()
  @Validate(IsObjectId)
  id!: string;
}
