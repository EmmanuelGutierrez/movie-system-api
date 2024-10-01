import { roles } from '../../../../common/constant/role.enum';
import { commonI } from '../../../../common/models/common.model';

export interface RoleI extends commonI {
  type: roles;
}
