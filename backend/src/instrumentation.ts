/**
 * Solution Exercise 5.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { intializeData } = await import('@/lib/db/seeder/db-initializer');
    await intializeData()
  }
}
