import { Injectable } from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class KategoriService {
  // buat constructor untuk prisma service
  constructor(private readonly prisma: PrismaService) {}
  create(createKategoriDto: CreateKategoriDto) {
    return 'This action adds a new kategori';
  }
// tampilkqn semua data kategori
  async findAll() {
    // return `This action returns all kategori`;
    // tampilkn data kategori
    const data = await this.prisma.kategori.findMany();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} kategori`;
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
