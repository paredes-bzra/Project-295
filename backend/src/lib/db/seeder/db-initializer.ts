/**
 * Solution Exercise 5.
 */
import bcrypt from 'bcryptjs'
import { initializeNoteDb, noteDb } from '../schema/note'
import { initializeUserDb, userDb } from '../schema/user'

export async function intializeData() {
  await initializeNoteDb()
  await initializeUserDb()

  const dbEmpty = (await noteDb().countAsync({ }) === 0)

  if (dbEmpty) {
    const admin = await userDb().insertAsync({
       email: 'admin@example.com',
        passwordHash: bcrypt.hashSync( '$user1234')
       })
    await noteDb().insertAsync({
      _userId: admin._id,
      name: "Einkaufen",
      description: "Brot, Energy Drink, Süsszeug, Salat",
      completionDate: null,
      dueDate: null
    })
  }
}
