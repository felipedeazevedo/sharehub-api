import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDTO } from './dto/CreateUserRequestDTO';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UpdateUserRequestDTO } from './dto/UpdateUserRequestDTO';
import { UserResponseDTO } from './dto/UserResponseDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserRequestDTO: CreateUserRequestDTO) {
    try {
      const existant_user = await this.userRepository.findOneBy({
        email: createUserRequestDTO.email,
      });

      if (existant_user) {
        throw new ConflictException(
          'Já existe um usuário cadastrado com esse email.',
        );
      }

      createUserRequestDTO.password = await bcrypt.hash(
        createUserRequestDTO.password,
        await bcrypt.genSalt(),
      );

      const new_user: UserEntity = this.userRepository.create({
        name: createUserRequestDTO.name,
        registration: createUserRequestDTO.registration,
        email: createUserRequestDTO.email,
        password: createUserRequestDTO.password,
        type: createUserRequestDTO.type,
        phone: createUserRequestDTO.phone,
        createdAt: new Date(),
        updatedAt: null,
      });

      return await this.userRepository.save(new_user);
    } catch (e) {
      if (e instanceof ConflictException) {
        throw e;
      } else {
        throw new InternalServerErrorException(
          'Erro ao criar usuário: ' + e.message,
        );
      }
    }
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserRequestDTO: UpdateUserRequestDTO) {
    await this.exists(id);

    if (updateUserRequestDTO.password) {
      updateUserRequestDTO.password = await bcrypt.hash(
        updateUserRequestDTO.password,
        await bcrypt.genSalt(),
      );
    }

    await this.userRepository.update(id, {
      name: updateUserRequestDTO.name,
      registration: updateUserRequestDTO.registration,
      email: updateUserRequestDTO.email,
      password: updateUserRequestDTO.password,
      phone: updateUserRequestDTO.phone,
      updatedAt: new Date(),
    });

    return this.findOne(id);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.userRepository.delete(id);
  }

  async exists(id: number) {
    if (
      !(await this.userRepository.exists({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }

  mapToDTO(user: UserEntity): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      registration: user.registration,
      phone: user.phone,
    };
  }
}
