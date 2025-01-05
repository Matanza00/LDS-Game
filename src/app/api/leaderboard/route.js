import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch leaderboard entries, sorted by score (descending)
    const leaderboard = await prisma.leaderboard.findMany({
      include: {
        user: true, // Include the user data (e.g., name)
      },
      orderBy: {
        score: "desc", // Sort by score in descending order
      },
      take: 10, // Optionally limit to the top 10 leaderboard entries
    });

    return new Response(
      JSON.stringify(leaderboard),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching leaderboard" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { score, userId } = await req.json();

  // Ensure userId is passed and valid
  if (!userId) {
    return new Response(
      JSON.stringify({ message: "User ID is required" }),
      { status: 400 }
    );
  }

  // Ensure the user exists in the database
  const user = await prisma.user.findUnique({
    where: { id: userId }, // Use userId to find the user
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "User not found" }),
      { status: 400 }
    );
  }

  try {
    // Create the leaderboard entry
    const leaderboardEntry = await prisma.leaderboard.create({
      data: {
        score,
        userId, // Attach the userId to the leaderboard entry
      },
    });

    return new Response(
      JSON.stringify(leaderboardEntry),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating leaderboard entry:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error. Please try again." }),
      { status: 500 }
    );
  }
}
