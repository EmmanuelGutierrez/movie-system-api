import { roles } from '../../../../common/constant/role.enum';
import { commonI } from '../../../../common/models/common.model';

/**
 * @swagger
 * components:
 *  schemas:
 *    Role:
 *      type: object
 *      required :
 *        - _id
 *        - type
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        _id:
 *          type: string
 *          description: id
 *        type:
 *          type: string
 *          enum:
 *            - user
 *            - admin
 *          description: role type
 *        createdAt:
 *          type: integer
 *          description: created date
 *        updatedAt:
 *          type: integer
 *          description: last updated date
 */

export interface RoleI extends commonI {
  type: roles;
}
