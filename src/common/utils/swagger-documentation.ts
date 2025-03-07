import swaggerJsDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';
const swaggerOptions: swaggerJsDoc.Options = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Movie system',
      description: 'Movie system api',
    },
    openapi: '3.0.0',
    // basePath: '../../router/index.ts',
  },
  //   definition: {
  //     info: {
  //       version: '1.0.0',
  //       title: 'Movie system',
  //       description: 'Movie system api',
  //     },
  //   },
  apis: [
    `./src/common/constant/**.ts`,
    `./src/common/constant/**.**.ts`,
    `./src/router/index.ts`,
    `./src/modules/**/**.router.ts`,
    `./src/modules/**/dto/**.dto.ts`,
    `./src/modules/**/interface/**.interface.ts`,
  ],
};
export const swaggerDocs = swaggerJsDoc(swaggerOptions);
