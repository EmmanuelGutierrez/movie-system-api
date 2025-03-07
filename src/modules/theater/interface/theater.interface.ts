import { commonI } from '../../../common/models/common.model';
import { CinemaI } from '../../cinema/interface/cinema.interface';
import { SeatsI } from './seats.interface';

/**
 * @swagger
 * components:
 *  schemas:
 *    Theater:
 *      type: object
 *      required :
 *        - _id
 *        - name
 *        - feature
 *        - active
 *        - seatingPlan
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *          description: name
 *        feature:
 *          type: string
 *          description: feature
 *        active:
 *          type: boolean
 *          description: is active
 *        seatingPlan:
 *          type: object
 *          properties:
 *            rows:
 *              type: integer
 *            seatsPerRow:
 *              type: integer
 *            layout:
 *              type: array
 *              description: seats
 *              items:
 *                $ref: '#/components/schemas/Seat'
 *        createdAt:
 *          type: integer
 *          description: release
 *        updatedAt:
 *          type: integer
 *          description: release
 *
 */

export interface TheaterI extends commonI {
  _id: string;
  name: string;
  feature: string;
  active: boolean;
  cinema: CinemaI;
  seatingPlan: {
    rows: number;
    seatsPerRow: number;
    layout: [SeatsI];
  };
}
