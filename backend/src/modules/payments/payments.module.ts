import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { EventEmitterService } from "@/common/services/event-emitter.service";
import { NotificationsModule } from "@/modules/notifications/notifications.module";
import { OcrService } from "@/common/services/ocr.service";

@Module({
  imports: [NotificationsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, EventEmitterService, OcrService],
  exports: [PaymentsService, EventEmitterService, OcrService],
})
export class PaymentsModule {}
