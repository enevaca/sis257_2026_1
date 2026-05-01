import type { Artista } from './artista'

export interface Album {
  id: number
  idArtista: number
  nombre: string
  fechaLanzamiento: Date
  artista: Artista
}
