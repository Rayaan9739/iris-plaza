"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const path_1 = require("path");
const fs_1 = require("fs");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
    const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:8080",
        "http://localhost:8081",
        frontendOrigin,
    ];
    app.use((0, express_1.json)({ limit: "1mb" }));
    const uploadsDir = (0, path_1.join)(process.cwd(), "uploads");
    if (!(0, fs_1.existsSync)(uploadsDir)) {
        (0, fs_1.mkdirSync)(uploadsDir, { recursive: true });
    }
    const videosDir = (0, path_1.join)(uploadsDir, "videos");
    if (!(0, fs_1.existsSync)(videosDir)) {
        (0, fs_1.mkdirSync)(videosDir, { recursive: true });
    }
    const roomsDir = (0, path_1.join)(uploadsDir, "rooms");
    if (!(0, fs_1.existsSync)(roomsDir)) {
        (0, fs_1.mkdirSync)(roomsDir, { recursive: true });
    }
    const agreementsDir = (0, path_1.join)(uploadsDir, "agreements");
    if (!(0, fs_1.existsSync)(agreementsDir)) {
        (0, fs_1.mkdirSync)(agreementsDir, { recursive: true });
    }
    app.useStaticAssets(uploadsDir, { prefix: "/uploads" });
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }
            callback(new Error("Not allowed by CORS"), false);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Iris Plaza API")
        .setDescription("Rental Property Management Platform API")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, document);
    const preferredPort = Number(process.env.PORT || 5000);
    let activePort = preferredPort;
    try {
        await app.listen(preferredPort);
    }
    catch (error) {
        const isAddrInUse = error?.code === "EADDRINUSE";
        if (!isAddrInUse || preferredPort !== 5000) {
            throw error;
        }
        activePort = 5001;
        await app.listen(activePort);
    }
    console.log(`Server running on port ${activePort}`);
    console.log(`Application is running on: http://localhost:${activePort}`);
    console.log(`Swagger docs available at: http://localhost:${activePort}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map