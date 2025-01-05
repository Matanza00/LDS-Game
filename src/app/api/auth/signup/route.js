import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Return the new user data (excluding the password)
      res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      console.error("Error in sign-up:", error);
      res.status(500).json({ message: "Internal Server Error. Please try again." });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
