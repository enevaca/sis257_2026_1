import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCancionDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del album es obligatorio' })
  @IsInt({ message: 'El id del album debe ser un número entero' })
  readonly idAlbum: number;

  @ApiProperty()
  @IsDefined({ message: 'El id del genero es obligatorio' })
  @IsInt({ message: 'El id del genero debe ser un número entero' })
  readonly idGenero: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(40, { message: 'El nombre no puede tener mas de 40 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La duracion es obligatoria' })
  @IsString({ message: 'La duracion debe ser una cadena de texto' })
  @MaxLength(8, { message: 'La duracion no puede tener mas de 8 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly duracion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Los tags son obligatorios' })
  @IsString({ message: 'Los tags deben ser una cadena de texto' })
  @MaxLength(50, { message: 'Los tags no pueden tener mas de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La url es obligatoria' })
  @IsString({ message: 'La url debe ser una cadena de texto' })
  @MaxLength(250, { message: 'La url no puede tener mas de 250 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly url: string;
}
