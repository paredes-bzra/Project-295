import { JWTPayload, SignJWT, jwtVerify } from 'jose'

const cryptoKey = new TextEncoder().encode(
  '08bca4435f1a4c46801691c859ce504716fd68fd113d43ecbc2754649ee' +
  '401f7380ac84e877a481f84a3ec8c530851958773d1af93bf4b4cba15' +
  'bd04c627de01'
)

// JWT generieren
export async function generateToken(claims: JWTPayload): Promise<string> {
  return await new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('urn:bwz-rappi-m295.example.com')
    .setAudience('urn:bwz-rappi-m295.example.com')
    .setExpirationTime('30d')
    .sign(cryptoKey)
}

// JWT validieren
export async function verifyToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, cryptoKey, {
    issuer: 'urn:bwz-rappi-m295.example.com',
    audience: 'urn:bwz-rappi-m295.example.com',
  })

  return payload
}
