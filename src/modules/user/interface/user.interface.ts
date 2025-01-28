import { commonI } from '../../../common/models/common.model';
import { RoleI } from '../role/interface/role.interface';

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required :
 *        - name
 *        - lastName
 *        - email
 *        - password
 *        - role
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        _id:
 *          type: string
 *          description: id
 *        name:
 *          type: string
 *          description: user name
 *        lastName:
 *          type: string
 *          description: user last name
 *        email:
 *          type: string
 *          description: user email
 *        password:
 *          type: string
 *          description: user password
 *        role:
 *          $ref: '#/components/schemas/Role'
 *          description: user last name
 *        createdAt:
 *          type: integer
 *          description: created date
 *        updatedAt:
 *          type: integer
 *          description: last updated date
 */

export interface UserI extends commonI {
  //   province: string;
  //   city: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role:RoleI
}
