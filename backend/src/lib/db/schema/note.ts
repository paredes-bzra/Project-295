/**
 * Solution Exercise 2.
 */
import Datastore from '@seald-io/nedb'
import { z } from 'zod'

// DB schema / settings
export const Note = z.object({
    _id: z.string().optional(),
    _userId: z.string().optional(),
    name: z.string(),
    description: z.string(),
    dueDate: z.string().nullable(),
    completionDate: z.string().nullable(),
})

// Model Type
export declare type NoteModel = z.infer<typeof Note>

let nedb: Datastore<NoteModel> | null = null

export function noteDb() {
  if (!nedb) {
    nedb = new Datastore( {
      filename: './data/note.db',
      autoload: true
    } )
  }
  return nedb
}


/**
 * Solution Exercise 5.
 */
export async function initializeNoteDb() {
  await noteDb().autoloadPromise;

  // add indexes
}
