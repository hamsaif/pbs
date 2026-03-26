import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from '../prisma.service';
import { metadata } from 'reflect-metadata/no-conflict';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Injectable()
export class KategoriService {
  // buat constructor untuk prisma service
  constructor(private readonly prisma: PrismaService) { }
  // simpan data kategori
  async create(createKategoriDto: CreateKategoriDto) {

    // buat variabel untuk filter nama
    const nama_filter = createKategoriDto.nama
      .replace(/\s/g, '')
      .toLowerCase()
      .trim();
    // cek apakah nama sudah ada
    const exist = await this.prisma.kategori.findFirst({
      where: {
        nama_filter: nama_filter,
      },
    });
    // jika nama kategori di temukan
    if (exist) {
      // tampilkan respon
      throw new ConflictException({
        succes: false,
        message: 'Data Kategori Gagal Disimpan (nama sudah ada)',
        metadata: {
          status: HttpStatus.CONFLICT,
        },
      });
    }
    // simpan data kategori
    await this.prisma.kategori.create({
      data: {
        nama: createKategoriDto.nama,
        nama_filter: nama_filter,
      },
    });
    // tampilkan respon
    return {
      succes: true,
      message: 'Data Kategori Berhasil Disimpan',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }
  // tampilkqn semua data kategori
  async findAll() {
    // tampilkan data kategori
    const data = await this.prisma.kategori.findMany({
      select: {
        id: true,
        nama: true,
      },
    });
    // jika data kategori kosong
    if (data.length === 0) {
      // throw new HttpException(
      //   {
      //     succes: false,
      //     message: 'Data Kategori Tidak Ditemukan (kosong)',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //       total_data: data.length,
      //     },
      //   }, HttpStatus.NOT_FOUND,
      // );

      throw new NotFoundException({
        succes: false,
        message: 'Data Kategori Tidak Ditemukan (kosong)',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    // jika data kategori ada
    return {
      succes: true,
      message: 'Data Kategori',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }
  // fungsi untuk tampilkan
  async findOne(id: number) {
    try {
      // tampilkan data kategori berdasarkan id
      const data = await this.prisma.kategori.findUnique({
        where: {
          id: id,
        },
      });

      // jika data kategori tidak di temukan
      if (!data) {
        throw new NotFoundException({
          succes: false,
          message: 'Data Kategori Tidak Ditemukan',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }
      // jika data kategori di temukan
      return {
        succes: true,
        message: '',
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        succes: false,
        message: 'Parameter/Slug ID Harus Angka',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
