import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRequestDTO } from './dto/UserRequestDTO';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userRequestDTO: UserRequestDTO) {
    const user = await this.prismaService.user.findFirst({
      where: { email: userRequestDTO.email },
    });

    if (user) {
      throw new ConflictException(
        'Já existe um usuário cadastrado com esse email.',
      );
    }

    userRequestDTO.password = await bcrypt.hash(
      userRequestDTO.password,
      await bcrypt.genSalt(),
    );

    return this.prismaService.user.create({
      data: userRequestDTO,
    });
  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async update(id: number, userRequestDTO: UserRequestDTO) {
    await this.exists(id);

    return this.prismaService.user.update({
      data: userRequestDTO,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async exists(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}
