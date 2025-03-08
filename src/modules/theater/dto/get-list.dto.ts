/**
 * @swagger
 * components:
 *  schemas:
 *    GetListTheaterDto:
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
 *            $ref: '#/components/schemas/Theater'
 *
 */

import { TheaterI } from "../interface/theater.interface";



export class GetListTheaterDto {
  page!: number;

  total!: number;

  inThisPage!: number;

  data!: TheaterI[];
}
