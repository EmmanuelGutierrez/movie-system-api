import { commonI } from '../../../common/models/common.model';
import { RoleI } from '../role/interface/role.interface';

export interface UserI extends commonI {
  //   province: string;
  //   city: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role:RoleI
}
