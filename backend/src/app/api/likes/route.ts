import { NextRequest } from "next/server";
import { Like, likeDb } from "@/lib/db/schema/likes"; // Neues Schema für Likes
import { getJwtHeader } from "@/lib/jwt-auth";
import { verifyToken } from "@/lib/jwt/jwt-generator";

/**
 * GET: /api/likes
 * Gibt alle Likes zurück
 */
export async function GET(request: NextRequest) {
  const jwtToken = getJwtHeader(request);
  const { _userId } = await verifyToken(jwtToken);
  if (!_userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const likesInDb = await likeDb().findAsync({});
  return Response.json(likesInDb);
}

/**
 * POST: /api/likes
 * Speichert einen neuen Like
 */
export async function POST(request: NextRequest) {
  const jwtToken = getJwtHeader(request);
  const { _userId } = await verifyToken(jwtToken);
  if (!_userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, success } = Like.safeParse(await request.json());
  if (!success) {
    return Response.json({ message: "Invalid object format." }, { status: 400 });
  }

  // Optional: prüfen, ob der User das Produkt schon geliked hat
  const existing = await likeDb().findOneAsync({ _userId, produkt_id: data.produkt_id });
  if (existing) {
    return Response.json({ message: "Already liked" }, { status: 400 });
  }

  const likeWithId = await likeDb().insertAsync({ ...data, _userId });
  return Response.json(likeWithId, { status: 201 });
}
