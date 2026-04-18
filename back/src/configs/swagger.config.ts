import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Magic Stock API')
    .setDescription('Aplicação Mult-Tenancy para gerenciamento de estoque ')
    .setVersion('1.0')
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'jwt',
            description: 'Informe o token JWT',
            in: 'header'
        },
        'access-token',
    )
    .build()