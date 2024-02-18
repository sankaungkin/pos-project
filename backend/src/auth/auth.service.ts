import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserInfoDtoTs } from './dtos/return-user-info.dto.ts';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dtos/signup.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid Credentials...');
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new ForbiddenException('Invalid Credentials...');
    // if (user.password !== password) {
    //   return null;
    // }

    return user;
  }
  async getToken(user: ReturnUserInfoDtoTs) {
    return this.jwtService.signAsync(user, {
      secret: process.env.JWT_SECRET,
    });
  }

  async getTokens(id: number, username: string, email: string, role: string) {
    const jwtPayload = {
      id: id,
      name: username,
      email: email,
      role: role,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        // expiresIn: 60 * 60 * 15,
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
    ]);

    // await this.updateRefreshHash(jwtPayload.sub, rt);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signup(signUpDto: SignupDto): Promise<any> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(signUpDto.password, saltOrRounds);

    const newUser = await this.prismaService.user.create({
      data: {
        email: signUpDto.email,
        name: signUpDto.username,
        password: hashedPassword,
        role: signUpDto.role,
        refreshToken: '',
      },
    });
    const tokens = await this.getTokens(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.role,
    );

    await this.updateRefreshHash(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async updateRefreshHash(userId: number, rt: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(rt, saltOrRounds);
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        refreshToken: hash,
      },
    });
  }
}
