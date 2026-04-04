import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGeneroDto {
  @IsNotEmpty({ message: 'La descripcion es obligatoria' })
  @IsString({ message: 'La descripcion debe ser una cadena de texto' })
  @MaxLength(50, { message: 'La descripcion no puede tener mas de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly descripcion: string;
}
