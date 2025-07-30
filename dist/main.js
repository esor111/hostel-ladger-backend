"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Kaha Hostel Management API')
        .setDescription('Comprehensive API for managing hostel operations')
        .setVersion('1.0')
        .addTag('students', 'Student management operations')
        .addTag('rooms', 'Room management operations')
        .addTag('invoices', 'Invoice management operations')
        .addTag('payments', 'Payment management operations')
        .addTag('ledger', 'Ledger management operations')
        .addTag('bookings', 'Booking request operations')
        .addTag('discounts', 'Discount management operations')
        .addTag('reports', 'Report generation operations')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Kaha Hostel NestJS API is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation available at: http://localhost:${port}/api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map