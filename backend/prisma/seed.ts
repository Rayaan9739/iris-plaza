import { PrismaClient, RoomType, RoomStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { phone: "+919999999999" },
    update: {},
    create: {
      phone: "+919999999999",
      email: "admin@manipal.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      isApproved: true,
      accountStatus: "ACTIVE",
      isEmailVerified: true,
      isPhoneVerified: true,
    },
  });

  console.log(`✅ Admin created/updated: ${admin.email}`);
  console.log(`   Phone: ${admin.phone}`);
  console.log(`   Password: admin123`);

  // Create some sample rooms
  const rooms = [
    {
      name: "Deluxe Single Room",
      type: "ONE_BHK" as RoomType,
      rent: 8000,
      deposit: 16000,
      area: 200,
      floor: 1,
      status: "AVAILABLE" as RoomStatus,
      description:
        "A cozy single room with attached bathroom and basic amenities.",
    },
    {
      name: "Double Occupancy Room",
      type: "ONE_BHK" as RoomType,
      rent: 12000,
      deposit: 24000,
      area: 300,
      floor: 2,
      status: "AVAILABLE" as RoomStatus,
      description: "Spacious double room perfect for friends or couples.",
    },
    {
      name: "Studio Apartment",
      type: "ONE_BHK" as RoomType,
      rent: 15000,
      deposit: 30000,
      area: 400,
      floor: 3,
      status: "AVAILABLE" as RoomStatus,
      description: "Modern studio with kitchenette and living area.",
    },
  ];

  for (const roomData of rooms) {
    const room = await prisma.room.create({
      data: roomData,
    });
    console.log(`✅ Created room: ${room.name}`);
  }

  console.log("\n🎉 Seeding completed!");
  console.log("\n📋 Admin Login Credentials:");
  console.log("   Phone: +919999999999 (or 9999999999)");
  console.log("   Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
