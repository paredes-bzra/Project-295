/**
 * Solution Exercise 5.
 */
import bcrypt from 'bcryptjs'
import { initializeNoteDb, noteDb } from '../schema/note'
import { initializeUserDb, userDb } from '../schema/user'
import { initializeLikesDb, likesDb } from '../schema/likes'

export async function intializeData() {
  await initializeNoteDb()
  await initializeUserDb()
  await initializeLikesDb()

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
