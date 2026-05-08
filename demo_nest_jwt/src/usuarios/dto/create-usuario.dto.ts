import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  @IsString({ message: 'El usuario debe ser una cadena de texto' })
  @MaxLength(15, { message: 'El usuario no puede tener mas de 15 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MaxLength(60, { message: 'El email no puede tener mas de 60 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @MaxLength(15, { message: 'El rol no puede tener mas de 15 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly rol: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo premium debe estar definido' })
  @IsBoolean({ message: 'El campo premium debe ser un valor booleano' })
  readonly premium: boolean;
}
