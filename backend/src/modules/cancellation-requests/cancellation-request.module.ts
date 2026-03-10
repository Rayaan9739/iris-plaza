import { Module } from "@nestjs/common";
import { CancellationRequestService } from "./cancellation-request.service";
import { CancellationRequestController } from "./cancellation-request.controller";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CancellationRequestController],
  providers: [CancellationRequestService],
  exports: [CancellationRequestService],
})
export class CancellationRequestModule {}
