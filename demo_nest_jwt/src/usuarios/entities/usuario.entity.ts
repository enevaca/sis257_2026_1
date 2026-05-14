import { compare, genSalt, hash } from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 15, unique: true })
  usuario: string;

  @Column('varchar', { length: 100, select: false })
  clave: string;

  @Column('varchar', { length: 60, unique: true })
  email: string;

  @Column('varchar', { length: 15 })
  rol: string;

  @Column('boolean', { default: false })
  premium: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModicicaion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await genSalt();
    this.clave = await hash(this.clave, salt);
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.clave);
  }
}
