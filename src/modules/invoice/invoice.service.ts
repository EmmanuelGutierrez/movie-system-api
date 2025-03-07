import { FilterQuery } from 'mongoose';
import { HttpException } from '../../common/utils/error/HttpException';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { FilterInvoiceDto } from './dto/filter.dto';
import { InvoiceI } from './interface/invoice.interface';
import { redisClient } from '../../redis/redis-client';
import { FileService } from '../file/file.service';
import { request } from 'express';
import { PhotosPoster } from '../file/type/multiple-files.type';
import { NotFoundException } from '../../common/utils/error';
import { InvoiceModel } from './model/invoice.model';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

export class InvoiceService {
  private invoiceModel = InvoiceModel;

  async createInvoice({ screeningId, ...data }: CreateInvoiceDto) {
    try {
      const invoice = await this.invoiceModel.create({
        screening: screeningId,
        ...data,
      });

      return invoice.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status ?? 500);
    }
  }

  // async update(invoiceId: string, data: UpdateInvoiceDto) {
  //   try {
  //     const res = await this.invoiceModel.updateOne({ _id: invoiceId }, data);
  //     return res;
  //   } catch (error: any) {
  //     throw new HttpException(error.message ?? 'Error', error.status ?? 500);
  //   }
  // }

  async getAll(params: FilterInvoiceDto) {
    try {
      // const invoices = await this.invoiceModel.find();
      const { limit = 10, page = 1, totalPrice } = params;
      const filters: FilterQuery<InvoiceI> = {};
      if (totalPrice) {
        filters.totalPrice = { $gt: totalPrice };
      }
      filters.active = true;
      const invoices = await this.invoiceModel
        .find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate([]);

      const total = await this.invoiceModel.countDocuments();
      return { page, inThisPage: invoices.length, total, data: invoices };
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Not found', 404);
    }
  }

  async getOneById(id: string) {
    try {
      // const invoices = await this.invoiceModel.find();
      const invoice = await this.invoiceModel
        .findById(id)
        .populate(['poster', 'photos']);

      if (!invoice) {
        throw new NotFoundException('Not found');
      }
      return invoice;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Not found', 404);
    }
  }

  // async logicDelete(invoiceId: string) {
  //   try {
  //     const invoice = await this.getOneById(invoiceId);
  //     const res = await this.invoiceModel.updateOne(
  //       { _id: invoiceId },
  //       { active: !invoice.active },
  //     );

  //     return res;
  //   } catch (error: any) {
  //     throw new HttpException(error.message ?? 'Error', error.status ?? 500);
  //   }
  // }
}
