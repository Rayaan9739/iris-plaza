import { Module } from '@nestjs/common';
import { AgreementsService } from './agreements.service';
import { AgreementsController } from './agreements.controller';
import { CloudinaryService } from '@/common/services/cloudinary.service';

@Module({
  controllers: [AgreementsController],
  providers: [AgreementsService, CloudinaryService],
  exports: [AgreementsService],
})
export class AgreementsModule {}
