import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import z from 'zod'
import { userDb } from '@/lib/db/schema/user'
import { generateToken } from '@/lib/jwt/jwt-generator'

// DTO (Data Transfer Object) für Validierung
const CredentialDto = z.object({
  email: z.string(),
  password: z.string(),
})

export const POST = async function (request: NextRequest) {
  // Anfrage-Body parsen und validieren
  const body = await request.json()
  const { data, error } = CredentialDto.safeParse(body)

  if (error) {
    return Response.json({ message: "Bad Request" }, { status: 400 })
  }

  // Passwort hashen und neuen Benutzer speichern
  const newUser = await userDb().insertAsync({
    email: data.email,
    passwordHash: bcrypt.hashSync(data.password),
  })

  // JWT generieren und zurückgeben
  const token = await generateToken({ _userId: newUser._id })

  return Response.json({
    email: data.email,
    jwt: token,
  })
}
