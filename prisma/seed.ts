import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding test users...");

  const hashedPassword1 = await bcrypt.hash("password1", 10);
  const hashedPassword2 = await bcrypt.hash("password2", 10);
  const hashedPassword3 = await bcrypt.hash("password3", 10);

  const testUsers = [
    { email: "test1@example.com", name: "Test User 1", password: hashedPassword1 },
    { email: "test2@example.com", name: "Test User 2", password: hashedPassword2 },
    { email: "test3@example.com", name: "Test User 3", password: hashedPassword3 },
  ];

  for (const user of testUsers) {
    await prisma.user.create({ data: user });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
