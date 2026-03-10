# Maintenance & Payment System Repair - Complete Summary

## Issue Fixed

Prisma schema, database structure, and service logic were out of sync, causing errors in the Money Reduction workflow and preventing proper tenant-to-maintenance ticket relationships.

---

## Changes Made

### 1. ✅ Prisma Schema - MaintenanceTicket Model

**File**: `prisma/schema.prisma`

**Changes**:

- Removed duplicate `userId` field
- Changed `tenantId String?` to `tenantId String` (now required)
- Added proper relation: `tenant User @relation(fields: [tenantId], references: [id])`
- Added booking relation: `booking Booking? @relation(fields: [bookingId], references: [id], onDelete: SetNull)`

**Before**:

```prisma
model MaintenanceTicket {
  id        String @id @default(uuid())
  userId    String
  tenantId  String?
  user      User @relation(fields: [userId], references: [id])
  bookingId String?
}
```

**After**:

```prisma
model MaintenanceTicket {
  id        String @id @default(uuid())
  tenantId  String
  bookingId String?

  tenant    User @relation(fields: [tenantId], references: [id])
  booking   Booking? @relation(fields: [bookingId], references: [id], onDelete: SetNull)
}
```

---

### 2. ✅ Prisma Schema - Payment Model

**File**: `prisma/schema.prisma`

**Changes**:

- Changed all amount fields to `Decimal` type (from `Int` for rentAmount, paidAmount, pendingAmount)
- Ensures financial precision and consistency
- Matches `amount` field type

**Before**:

```prisma
amount          Decimal
rentAmount      Int?
paidAmount      Int?
pendingAmount   Int?
```

**After**:

```prisma
amount          Decimal @db.Decimal(10, 2)
rentAmount      Decimal? @db.Decimal(10, 2)
paidAmount      Decimal? @db.Decimal(10, 2)
pendingAmount   Decimal? @db.Decimal(10, 2)
```

---

### 3. ✅ Maintenance Service - Query Updates

**File**: `src/modules/maintenance/maintenance.service.ts`

**Changes**:

#### findMyTickets()

- Changed `where: { userId }` to `where: { tenantId: userId }`

#### create()

- Changed `userId` to `tenantId: userId` in ticket data
- Removed `userId` field from ticketData object

#### findOne()

- Updated includes: `include: { tenant: true, booking: true }`
- Changed from `user` relation to `tenant` relation

#### findAll()

- Updated includes: `include: { tenant: true, booking: { include: { room: true } } }`

#### New Methods Added

**approveRequest(ticketId)**

- Updates ticket status to RESOLVED (approved)
- Triggers money reduction logic if category is MONEY_REDUCTION
- Handles approved state with timestamp

**applyMoneyReduction(tenantId, bookingId, reductionAmount)**

- Fetches current month payment
- Reduces current month rent by requested amount
- Sets pendingAmount to track the reduction
- Creates/updates next month payment with carry-over
- Next month = baseRent + pendingAmount (reduction)

**rejectRequest(ticketId, reason)**

- Updates ticket status to CLOSED (rejected)
- Stores rejection reason
- Sets resolved timestamp

---

### 4. ✅ Payments Service - Decimal Type Support

**File**: `src/modules/payments/payments.service.ts`

**Changes**:

#### Added Import

```typescript
import { Decimal } from "@prisma/client/runtime/library";
```

#### ensureCurrentMonthPayment()

- Updated to create payment records with `Decimal` values
- Uses `new Decimal(rent)` for precise financial calculations

#### create()

- Updated to use `new Decimal(dto.amount)` for amount field
- Ensures proper type handling

---

## Required Database Migration

### Step 1: Generate Prisma Client

```bash
cd backend
npx prisma generate
```

### Step 2: Push Schema to Database

```bash
npx prisma db push
```

**Expected Prompts**:

- Adding `tenantId` column to maintenance_tickets table
- Making `tenantId` required
- Removing `userId` column or keeping it (drop recommended)
- Converting `rentAmount`, `paidAmount`, `pendingAmount` to Decimal type
- Adding `booking` relation support

---

## Money Reduction Workflow

### Tenant Flow

1. **Submits Request**: POST `/api/maintenance/request`

   ```json
   {
     "title": "Financial hardship",
     "category": "MONEY_REDUCTION",
     "description": "Need rent reduction",
     "requestedAmount": 1500
   }
   ```

2. **Request Created**: Maintenance ticket stored with tenantId and bookingId

### Admin Flow

1. **Reviews Requests**: GET `/admin/maintenance`
   - See tenant name, category, requested amount
2. **Approves Request**: PATCH `/admin/maintenance/:id/approve`
   - Money reduction is automatically applied

### Payment Impact

**Example: Base rent ₹15,000, Requested reduction ₹1,500**

**Current Month** (after approval):

- Current rent: ₹13,500 (15000 - 1500)
- Pending amount: ₹1,500 (to be paid next month)

**Next Month**:

- New rent: ₹16,500 (15000 + 1500)
- Tenant pays full amount to cover reduction carried over

---

## Validation Checklist

After running `npx prisma db push`, verify:

- ✅ No schema errors in Prisma
- ✅ MaintenanceTicket has `tenantId` (required, no userId)
- ✅ MaintenanceTicket has booking relation
- ✅ Payment model uses Decimal for all amounts
- ✅ Payment model has `month` field (required)
- ✅ Tenant can create maintenance request (GET ✅)
- ✅ Admin can view all requests (GET ✅)
- ✅ Money reduction reduces current month rent
- ✅ Next month rent includes pending amount
- ✅ No type errors or schema mismatches

---

## Files Modified

1. ✅ `prisma/schema.prisma`
   - MaintenanceTicket model
   - Payment model (decimal types)

2. ✅ `src/modules/maintenance/maintenance.service.ts`
   - Query field updates (userId → tenantId)
   - New approval/rejection workflow methods
   - Money reduction logic

3. ✅ `src/modules/payments/payments.service.ts`
   - Decimal import
   - Decimal value handling
   - Type consistency

---

## Expected Results

✅ Maintenance system is fully operational
✅ Tenants can submit money reduction requests without errors
✅ Admin can approve/reject with proper database updates
✅ Payment amounts are tracked correctly
✅ Money reduction is properly applied to current and next month
✅ All Prisma queries execute without schema mismatch errors
