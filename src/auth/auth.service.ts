import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, id: data.id };

    return this.jwtService.sign(payload);
  }

  async login(user: UserEntity) {
    return {
      ...user,
      token: this.generateJwtToken(user),
    };
  }

  async register(userDto: CreateUserDto) {
    try {
      const user = await this.userService.create({
        email: userDto.email,
        password: userDto.password,
        fullName: userDto.fullName,
      });

      return {
        ...user,
        token: this.generateJwtToken(user),
      };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }
}
