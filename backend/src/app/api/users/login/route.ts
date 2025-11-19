import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import z from 'zod'
import { userDb } from '@/lib/db/schema/user'
import { generateToken } from '@/lib/jwt/jwt-generator'

const CredentialDto = z.object({
  email: z.string(),
  password: z.string(),
})

export const POST = async function (request: NextRequest) {
  const body = await request.json()
  const { data, error } = CredentialDto.safeParse(body)

  if (error) {
    return Response.json({ message: "Bad Request" }, { status: 400 })
  }

  const user = await userDb().findOneAsync({ email: data.email })

  if (user && bcrypt.compareSync(data.password, user.passwordHash)) {
    return Response.json({
      email: user.email,
      jwt: await generateToken({ _userId: user._id }),
    })
  }

  return Response.json({}, { status: 401 })
}
