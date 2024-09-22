import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'ObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return Types.ObjectId.isValid(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return '($value) in not a objectId';
  }
}
