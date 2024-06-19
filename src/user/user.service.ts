import {
  ConflictException, forwardRef, Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UpdateUserRequestDTO } from './dto/UpdateUserRequestDTO';
import { UserResponseDTO } from './dto/UserResponseDTO';
import { AuthRegisterDTO } from '../auth/dto/auth-register.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(user: AuthRegisterDTO) {
    try {
      const existantUser = await this.userRepository.findOneBy({
        email: user.email,
      });

      if (existantUser) {
        throw new ConflictException(
          'Já existe um usuário cadastrado com esse email.',
        );
      }

      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());

      const newUser: UserEntity = this.userRepository.create({
        name: user.name,
        registration: user.registration,
        email: user.email,
        password: user.password,
        type: user.type,
        phone: user.phone,
        createdAt: new Date(),
        updatedAt: null,
      });

      return await this.userRepository.save(newUser);
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

    return this.authService.createToken(await this.findOne(id));
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
      email: user.email,
    };
  }
}
