import {
  BadRequestException, forwardRef,
  HttpStatus, Inject,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserRepository } from '../user/user.repository';
import { ConfigService } from '@nestjs/config';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  private readonly issuer = 'login';
  private readonly audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type,
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

    const mailerSend = new MailerSend({
      apiKey: process.env.API_KEY,
    });
    const sentFrom = new Sender(
      'sharehub@trial-z3m5jgryxrm4dpyo.mlsender.net',
      'ShareHub',
    );

    const recipients = [new Recipient(email)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject('Recuperaçao de senha ShareHub')
      .setHtml(this.getHtmlTemplate(user.name, token));

    await mailerSend.email.send(emailParams);

    return {
      status: HttpStatus.OK,
      message: 'E-mail enviado com senha temporária.',
    };
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

      const encrypted_password: string = await bcrypt.hash(
        password,
        await bcrypt.genSalt(),
      );
      await this.userRepository.update(Number(data.id), {
        password: encrypted_password,
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

  getHtmlTemplate(userName: string, token: string): string {
    return `<!DOCTYPE html>
                          <html>
                          <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <style>
                                  body {
                                      font-family: Arial, sans-serif;
                                      background-color: #f0f8ff; /* Light blue background */
                                      color: #333333;
                                      padding: 20px;
                                  }
                                  .container {
                                      max-width: 600px;
                                      margin: 0 auto;
                                      background-color: #ffffff;
                                      border: 1px solid #e0e0e0;
                                      border-radius: 10px;
                                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                      overflow: hidden;
                                  }
                                  .header {
                                      background-color: #0073e6; /* Darker blue for header */
                                      color: #ffffff;
                                      padding: 20px;
                                      text-align: center;
                                  }
                                  .content {
                                      padding: 20px;
                                      word-wrap: break-word;
                                  }
                                  .footer {
                                      background-color: #e0e0e0;
                                      color: #666666;
                                      padding: 10px;
                                      text-align: center;
                                  }
                                  .button {
                                      display: inline-block;
                                      padding: 10px 20px;
                                      background-color: #0073e6; /* Darker blue for button */
                                      color: #ffffff;
                                      text-decoration: none;
                                      border-radius: 5px;
                                      margin-top: 20px;
                                  }
                                  .button:hover {
                                      background-color: #005bb5; /* Darker shade for hover effect */
                                  }
                              </style>
                          </head>
                          <body>
                              <div class="container">
                                  <div class="header">
                                      <h1>Recuperação de Senha</h1>
                                  </div>
                                  <div class="content">
                                      <p>Olá ${userName},</p>
                                      <p>Você solicitou a recuperação de sua senha. Use a senha a seguir para acessar sua conta: ${token}</p>
                                      <p>Se você não solicitou essa alteração, por favor ignore este email.</p>
                                  </div>
                                  <div class="footer">
                                      <p>&copy; 2024 ShareHub. Todos os direitos reservados.</p>
                                  </div>
                              </div>
                          </body>
                          </html>`;
  }
}
