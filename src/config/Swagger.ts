import swaggerJsdoc from 'swagger-jsdoc';
import {koaSwagger} from "koa2-swagger-ui";

const options = {
    definition: {
        openapi: '3.0.0', info: {
            title: 'Recommended Books API', version: "1.0.0", description: "Recommended Books API",
        }, servers: [{
            url: 'http://localhost:3000'
        }], components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http', scheme: 'bearer', bearerFormat: 'JWT'
                }
            }
        }
    }, apis: ['./src/routes/*.ts', './src/domain/dto/*.ts']
}

export const specs = swaggerJsdoc(options);

export const swaggerUI = koaSwagger({
    routePrefix: '/docs', swaggerOptions: {spec: specs}
} as any);