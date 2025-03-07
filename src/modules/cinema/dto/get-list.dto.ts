/**
 * @swagger
 * components:
 *  schemas:
 *    GetListDto:
 *      type: object
 *      required :
 *        - page
 *        - inThisPage
 *        - total
 *        - data
 *      properties:
 *        page:
 *          type: integer
 *          description: page
 * 
 *        inThisPage:
 *          type: integer
 *          description: elements in this page
 * 
 *        total:
 *          type: integer
 *          description: total in db
 *        data:
 *          type: array
 *          description: data
 *          items:
 *            $ref: '#/components/schemas/Cinema'
 *
 */

import { CinemaI } from '../interface/cinema.interface';

export class GetListCinemaDto {
  page!: number;

  total!: number;

  inThisPage!: number;

  data!: CinemaI[];
}
