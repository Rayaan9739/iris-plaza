import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { json } from "express";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Frontend URL from environment
  const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

  // Allow common dev ports
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:8081",
    frontendOrigin,
  ];

  // Parse JSON body
  app.use(json({ limit: "1mb" }));

  /**
   * CORS configuration
   */
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

  /**
   * Global API prefix
   * Example:
   * /api/users
   */
  app.setGlobalPrefix("api");

  /**
   * Validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  /**
   * Swagger API docs
   */
  const config = new DocumentBuilder()
    .setTitle("Iris Plaza API")
    .setDescription("Rental Property Management Platform API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  /**
   * Start server
   * Render automatically provides PORT
   */
  const port = Number(process.env.PORT) || 5000;

  await app.listen(port);

  console.log(`Server running on port ${port}`);
  console.log(`Application running at: http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();