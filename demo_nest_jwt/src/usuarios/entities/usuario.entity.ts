import { createHash } from 'crypto';
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
  hashClave() {
    this.clave = createHash('sha256').update(this.clave).digest('hex');
  }
}
