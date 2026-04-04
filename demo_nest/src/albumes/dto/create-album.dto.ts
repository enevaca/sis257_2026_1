import { Transform } from 'class-transformer';
import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAlbumDto {
  @IsDefined({ message: 'El id del artista es obligatorio' })
  @IsInt({ message: 'El id del artista debe ser un número entero' })
  readonly idArtista: number;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El nombre no puede tener mas de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;

  @IsDefined({ message: 'La fecha de lanzamiento es obligatoria' })
  @IsDateString({}, { message: 'La fecha de lanzamiento debe ser una fecha válida' })
  readonly fechaLanzamiento: Date;
}
