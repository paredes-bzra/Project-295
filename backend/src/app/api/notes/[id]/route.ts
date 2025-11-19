/**
 * Solution Exercise 3.
 */
import { NextRequest } from "next/server"
import { Note, noteDb } from "@/lib/db/schema/note"
import { getJwtHeader } from "@/lib/jwt-auth"
import { verifyToken } from "@/lib/jwt/jwt-generator"

declare type PathParams = { params: Promise<{ id: string }> }

/**
 * GET: api/notes/_59274223
 * @returns Returns the note associated to the given id.
 */
export async function GET(request: NextRequest, context: PathParams) {
    const jwtToken = getJwtHeader(request)
   const { _userId } = await verifyToken(jwtToken)
    if (!_userId) {
       return Response.json( { message: 'Unauthorized' },
         { status: 401 } ) }
  const { id } = await context.params
  const note = await noteDb().findOneAsync({ _id: id })
  
  if (note) {
    return Response.json(note) 
  }
  return Response.json(
    { message: 'The given note id cannot be found.' },
    { status: 404 } )
}


/**
 * PUT: api/notes/_59274223
 * 
 * @returns Nothing (null) with status code 204, if succeeded.
 */
export async function PUT(request: NextRequest, context: PathParams) {
    const jwtToken = getJwtHeader(request)
   const { _userId } = await verifyToken(jwtToken)
    if (!_userId) {
       return Response.json( { message: 'Unauthorized' },
         { status: 401 } ) }
  const { id } = await context.params
  
  // Solution Exercise 4
  const { data, success } = Note.safeParse(await request.json())
  if (!success) { return Response.json({ message: 'Invalid object format.' }, { status: 400 }) }

  if (id === data._id) {
    const {numAffected} = await noteDb().updateAsync({ _id: id }, data)
    
    if (numAffected > 0) {
      return new Response(null, { status: 204 })
    }
  }
  return Response.json({ message: 'The given note id cannot be found.' }, { status: 404 })
}


/**
 * DELETE: api/notes/_59274223
 * 
 * @returns Nothing (null) with status code 204, if succeeded.
 */
export async function DELETE(request: NextRequest, context: PathParams) {
    const jwtToken = getJwtHeader(request)
   const { _userId } = await verifyToken(jwtToken)
    if (!_userId) {
       return Response.json( { message: 'Unauthorized' },
         { status: 401 } ) }
  const { id } = await context.params
  const numRemoved = await noteDb().removeAsync({ _id: id }, { });

  if (numRemoved > 0) {
    return new Response(null, { status: 204 } )
  }
  return Response.json({ message: "The given note id cannot be found." }, { status: 404 })
}
