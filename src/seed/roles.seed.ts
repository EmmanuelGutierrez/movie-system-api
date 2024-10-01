// const RoleModel = require('../modules/user/role/model/role.model');

// import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { RoleModel } from '../modules/user/role/model/role.model';
import { roles } from '../common/constant/role.enum';

// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const RoleModel = require(__dirname + '/../modules/user/role/model/role.model.ts');

// dotenv.config();
export async function seedRoles() {
  const rolesValues = Object.values(roles);
  // const rolesArray = ['admin', 'user'];
  // const dbUrl = `${process.env.DATABASE_HOST}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_CONNECTION}.mongodb.net/?retryWrites=true&w=majority`;
  try {
    // await mongoose.connect(dbUrl, { dbName: process.env.DATABASE_NAME });
    const rolesExist = await RoleModel.find({ type: { $in: rolesValues } });
    // await RoleModel.deleteMany();
    const rolesToInsert = rolesValues.filter(
      (role) => !rolesExist.some((rx) => rx.type === role),
    );
    if (rolesToInsert.length) {
      const promises = rolesToInsert.map((r, i) => {
        return RoleModel.create({ type: r });
      });
      console.log(rolesToInsert);
      await Promise.all(promises);
    }
    // const existRoles = await RoleModel.find({ type: rolesArray });
    // if (existRoles.length < 2) {
    //   rolesArray.map((r) => {
    //     console.log(r);
    //   });
    // }
  } catch (error) {
    console.error(error);
    throw new Error('db error');
  } /* finally {
    mongoose.disconnect();
  } */
}
// seedRoles();
