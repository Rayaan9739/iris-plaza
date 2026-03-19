-- Normalize existing room type values before shrinking enum
UPDATE "rooms"
SET "type" = 'ONE_BHK'
WHERE "type" IN ('STUDIO', 'SINGLE', 'DOUBLE');

UPDATE "rooms"
SET "type" = 'TWO_BHK'
WHERE "type" = 'THREE_BHK';

UPDATE "rooms"
SET "type" = 'PENTHOUSE'
WHERE "type" IN ('SUITE', 'PENT_HOUSE');

-- Replace enum with canonical values only
ALTER TYPE "RoomType" RENAME TO "RoomType_old";

CREATE TYPE "RoomType" AS ENUM ('ONE_BHK', 'TWO_BHK', 'PENTHOUSE');

ALTER TABLE "rooms"
ALTER COLUMN "type" TYPE "RoomType"
USING (
  CASE
    WHEN "type"::text IN ('STUDIO', 'SINGLE', 'DOUBLE') THEN 'ONE_BHK'::"RoomType"
    WHEN "type"::text = 'THREE_BHK' THEN 'TWO_BHK'::"RoomType"
    WHEN "type"::text IN ('SUITE', 'PENT_HOUSE') THEN 'PENTHOUSE'::"RoomType"
    ELSE "type"::text::"RoomType"
  END
);

DROP TYPE "RoomType_old";
