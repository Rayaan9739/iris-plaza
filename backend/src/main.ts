import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { json } from "express";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

  // Allow both common frontend dev ports (Vite default 5173 and alternative 8080, 8081)
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:8081",
    frontendOrigin,
  ];

  // Parse JSON bodies from frontend requests.
  app.use(json({ limit: "1mb" }));

  const uploadsDir = join(process.cwd(), "uploads");
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }
  const videosDir = join(uploadsDir, "videos");
  if (!existsSync(videosDir)) {
    mkdirSync(videosDir, { recursive: true });
  }
  const roomsDir = join(uploadsDir, "rooms");
  if (!existsSync(roomsDir)) {
    mkdirSync(roomsDir, { recursive: true });
  }
  const agreementsDir = join(uploadsDir, "agreements");
  if (!existsSync(agreementsDir)) {
    mkdirSync(agreementsDir, { recursive: true });
  }
  app.useStaticAssets(uploadsDir, { prefix: "/uploads" });

  // Allow only the frontend origin for browser requests.
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      // Also allow if origin is in the allowed list
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

  // Global prefix
  app.setGlobalPrefix("api");

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Iris Plaza API")
    .setDescription("Rental Property Management Platform API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const preferredPort = Number(process.env.PORT || 5000);
  let activePort = preferredPort;

  try {
    await app.listen(preferredPort);
  } catch (error: any) {
    const isAddrInUse = error?.code === "EADDRINUSE";
    if (!isAddrInUse || preferredPort !== 5000) {
      throw error;
    }
    activePort = 5001;
    await app.listen(activePort);
  }

  console.log(`Server running on port ${activePort}`);
  console.log(`Application is running on: http://localhost:${activePort}`);
  console.log(
    `Swagger docs available at: http://localhost:${activePort}/api/docs`,
  );
}
bootstrap();
