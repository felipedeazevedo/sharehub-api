import {
  BadRequestException, HttpStatus,
  Injectable, InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  private readonly issuer = 'login';
  private readonly audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '3d',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new UnauthorizedException('E-mail está incorreto.');
      }

      const token = this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: '30 minutes',
          subject: String(user.id),
          issuer: 'forget',
          audience: this.audience,
        },
      );

      await this.mailerService.sendMail({
        subject: 'Recuperação de senha ShareHub',
        to: email,
        template: 'reset-password',
        context: {
          name: user.name,
          token: token,
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'E-mail enviado com senha temporária.',
      };
    } catch (e) {
      throw new InternalServerErrorException(
        'Não foi possível recuperar a senha: ' + e,
      );
    }
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: this.audience,
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token inválido.');
      }

      await this.userRepository.update(Number(data.id), {
        password,
      });

      const user = await this.userService.findOne(Number(data.id));

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
