import { NextRequest } from 'next/server'

export function getJwtHeader(request: NextRequest): string {
  const authHeader = request.headers.get('authorization')

  // Wenn kein Header vorhanden ist oder nicht mit "Bearer " beginnt → leerer String
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ''
  }

  // Token aus dem Header extrahieren
  return authHeader.slice('Bearer '.length).trim()
}
