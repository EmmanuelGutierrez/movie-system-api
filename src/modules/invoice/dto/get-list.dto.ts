/**
 * @swagger
 * components:
 *  schemas:
 *    GetListInvoiceDto:
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
 *            $ref: '#/components/schemas/Invoice'
 *
 */

import { InvoiceI } from '../interface/invoice.interface';

export class GetListInvoiceDto {
  page!: number;

  total!: number;

  inThisPage!: number;

  data!: InvoiceI[];
}
