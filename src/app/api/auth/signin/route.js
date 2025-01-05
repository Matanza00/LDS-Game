import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ id: user.id, name: user.name, email: user.email }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in authentication:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error. Please try again." }),
      { status: 500 }
    );
  }
}
