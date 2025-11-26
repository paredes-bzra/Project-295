import Datastore from '@seald-io/nedb'
import { z } from 'zod'

// DB schema / settings
export const Likes = z.object({
    _id: z.string().optional(),
    email: z.string(),
    produkt_id: z.number()
})

// Model Type
export declare type LikesModel = z.infer<typeof Likes>

let nedb: Datastore<LikesModel> | null = null

export function likesDb() { if (!nedb) {
    nedb = new Datastore( { filename: './data/likes.db',
    autoload: true
 } )
}
 return nedb
}
export async function initializeLikesDb() {
     await likesDb().autoloadPromise
}