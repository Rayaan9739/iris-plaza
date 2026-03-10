import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Res,
  HttpStatus,
  Request,
} from "@nestjs/common";
import { Response } from "express";
import * as path from "path";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AgreementsService } from "./agreements.service";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Roles } from "@/common/decorators/roles.decorator";

@ApiTags("Agreements")
@Controller("agreements")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AgreementsController {
  constructor(private agreementsService: AgreementsService) {}

  @Get("my")
  @ApiOperation({ summary: "Get current user's agreement" })
  async getMyAgreement(@Request() req: any) {
    const userId = req.user?.id || req.user?.sub;
    if (!userId) {
      return { agreement: null };
    }
    const agreement = await this.agreementsService.findMyAgreement(userId);
    return { agreement };
  }

  @Get("booking/:bookingId")
  @ApiOperation({ summary: "Get agreement by booking ID" })
  async findByBooking(@Param("bookingId") bookingId: string) {
    return this.agreementsService.findByBooking(bookingId);
  }

  @Post("booking/:bookingId/sign")
  @ApiOperation({ summary: "Sign agreement as tenant" })
  async signAsTenant(@Param("bookingId") bookingId: string) {
    return this.agreementsService.signAsTenant(bookingId);
  }

  @Post("admin/booking/:bookingId/sign")
  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @ApiOperation({ summary: "Sign agreement as admin" })
  async signAsAdmin(@Param("bookingId") bookingId: string) {
    return this.agreementsService.signAsAdmin(bookingId);
  }

  @Get("booking/:bookingId/download")
  @ApiOperation({ summary: "Download agreement PDF" })
  async downloadPdf(
    @Param("bookingId") bookingId: string,
    @Res() res: Response,
  ) {
    const agreement = await this.agreementsService.findByBooking(bookingId);
    
    if (!agreement || !agreement.agreementUrl) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "Agreement not found" });
    }
    
    const filePath = agreement.agreementUrl.replace('/uploads/', '');
    const fullPath = path.join(process.cwd(), 'uploads', filePath);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=agreement_${bookingId}.pdf`);
    
    return res.sendFile(fullPath);
  }

  @Get("view/:bookingId")
  @ApiOperation({ summary: "View agreement in browser (view-only, no download)" })
  async viewAgreement(
    @Param("bookingId") bookingId: string,
    @Request() req: any,
    @Res() res: Response,
  ) {
    // Get the logged-in user ID from JWT
    const userId = req.user?.id || req.user?.sub;
    
    if (!userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    
    // Verify ownership - the user must be the tenant who made the booking
    const agreement = await this.agreementsService.findByBookingWithUser(bookingId);
    
    if (!agreement || !agreement.agreementUrl) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "Agreement not found" });
    }
    
    // Check if the logged-in user is the tenant who owns this booking
    if (agreement.booking?.userId !== userId) {
      // Also check if user is admin
      const isAdmin = req.user?.role === 'ADMIN' || req.user?.roles?.includes('ADMIN');
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: "You don't have permission to view this agreement" });
      }
    }
    
    const filePath = agreement.agreementUrl.replace('/uploads/', '');
    const fullPath = path.join(process.cwd(), 'uploads', filePath);
    
    // Set headers to prevent caching, downloading, and screenshots
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Disposition', 'inline'); // View in browser, don't download
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY'); // Prevent embedding in iframes (some protection against screenshots)
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Document-Policy', 'no-download'); // Some browsers support this
    
    return res.sendFile(fullPath);
  }
}
