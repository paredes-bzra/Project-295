/**
 * Solution Exercise 3.
 */
import { NextRequest } from "next/server"
import { Note, noteDb } from "@/lib/db/schema/note"
import { getJwtHeader } from "@/lib/jwt-auth"
import { verifyToken } from "@/lib/jwt/jwt-generator"

/**
 * GET: api/notes
 * 
 * @returns Returns all notes stored in the database.
 */
export async function GET(request: NextRequest){
  const jwtToken = getJwtHeader(request)
   const { _userId } = await verifyToken(jwtToken)
    if (!_userId) {
       return Response.json( { message: 'Unauthorized' },
         { status: 401 } ) }
  const notesInDb = await noteDb().findAsync({ })
  return Response.json(notesInDb)
}


/**
 * POST: api/notes
 * 
 * @returns Returns the created note.
 */
export async function POST(request: NextRequest) {
    const jwtToken = getJwtHeader(request)
   const { _userId } = await verifyToken(jwtToken)
    if (!_userId) {
       return Response.json( { message: 'Unauthorized' },
         { status: 401 } ) }
  // Solution Exercise 4
  const { data, success } = Note.safeParse(await request.json())
  if (!success) { return Response.json({ message: 'Invalid object format.' }, { status: 400 }) }

  const noteWithId = await noteDb().insertAsync(data)
  return Response.json(noteWithId, { status: 201 })
}