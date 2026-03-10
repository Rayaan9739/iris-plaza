import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { RoomsModule } from "@/modules/rooms/rooms.module";
import { BookingsModule } from "@/modules/bookings/bookings.module";
import { NotificationsModule } from "@/modules/notifications/notifications.module";
import { PaymentsModule } from "@/modules/payments/payments.module";
import { EventEmitterService } from "@/common/services/event-emitter.service";
import { CloudinaryService } from "@/common/services/cloudinary.service";

@Module({
  imports: [RoomsModule, BookingsModule, NotificationsModule, PaymentsModule],
  controllers: [AdminController],
  providers: [AdminService, EventEmitterService, CloudinaryService],
  exports: [AdminService],
})
export class AdminModule {}
