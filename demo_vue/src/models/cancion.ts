import type { Album } from './album'
import type { Genero } from './genero'

export interface Cancion {
  id: number
  idAlbum: number
  idGenero: number
  nombre: string
  duracion: number
  tags: string
  url: string
  album: Album
  genero: Genero
}
