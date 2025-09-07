import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserRole } from 'src/common/enums/user.enum';
import type { IUserService } from '../user/interfaces/user.service';
import { ResData } from 'src/database/resData';
import { AuthLoginDto } from './dto/auth-login.dto';
import {
  InvalidRoleException,
  WrongPasswordOrEmailException,
} from './exceptions/auth.exception';
import { BcryptEncryption } from 'src/library/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('IUserService') private userService: IUserService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto) {
    if (
      authRegisterDto.role !== UserRole.STUDENT &&
      authRegisterDto.role !== UserRole.INSTRUCTOR
    ) {
      throw new InvalidRoleException();
    }

    const { data } = await this.userService.create(authRegisterDto);

    return new ResData(`${data?.role} registered successfully`, 201, data);
  }

  async login(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

    const { data } = await this.userService.findByEmail(email);

    const isPasswordMatching = await BcryptEncryption.compare(
      password,
      data?.password || '',
    );

    if (!isPasswordMatching) {
      throw new WrongPasswordOrEmailException();
    }

    const payload = { sub: data?.id, role: data?.role };

    const access_token = this.jwtService.sign(payload);

    return new ResData('Login successful', 200, { access_token });
  }
}
