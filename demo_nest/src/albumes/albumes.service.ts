import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumesService {
  constructor(@InjectRepository(Album) private readonly albumRepository: Repository<Album>) {}

  async create(createAlbumeDto: CreateAlbumDto): Promise<Album> {
    let album = await this.albumRepository.findOneBy({
      idArtista: createAlbumeDto.idArtista,
      nombre: createAlbumeDto.nombre,
    });
    if (album) throw new ConflictException('El album ya existe para ese artista');

    album = new Album();
    Object.assign(album, createAlbumeDto);
    return this.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.find({ relations: { artista: true }, order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: { artista: true },
    });
    if (!album) throw new NotFoundException('El album no existe');
    return album;
  }

  async update(id: number, updateAlbumeDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    Object.assign(album, updateAlbumeDto);
    return this.albumRepository.save(album);
  }

  async remove(id: number) {
    const album = await this.findOne(id);
    return this.albumRepository.softRemove(album);
  }
}
