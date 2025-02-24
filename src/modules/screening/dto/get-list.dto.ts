/**
 * @swagger
 * components:
 *  schemas:
 *    GetListScreeningDto:
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
 *            $ref: '#/components/schemas/Screening'
 *
 */

import { ScreeningI } from "../interface/screening.interface";


export class GetListScreeningDto {
  page!: number;

  total!: number;

  inThisPage!: number;

  data!: ScreeningI[];
}
