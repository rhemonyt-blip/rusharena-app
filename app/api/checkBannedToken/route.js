// pages/api/checkBannedToken.js
import { connectDB } from "@/lib/connectDB";
import bannedUsers from "@/models/bannedUser";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { token } = req.body;

  await connectDB();
  console.log(token);

  const banned = await bannedUsers.findOne({
    userId: "69579f2bf56c8965d8ba7d3f",
  });
  res.status(200).json({ isBanned: !!banned });
}
