import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwtStrategy from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  jwtStrategy.Strategy,
  'refresh',
) {
  constructor(private prismaService: PrismaService) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: jwtStrategy.ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth'];
          if (data == null) {
            return null;
          }
          return data.accessToken;
        },
      ]),
    });
  }

  async validate(req: Request, payload: any) {
    const data = req?.cookies['auth'];
    if (!data.refreshToken) {
      throw new UnauthorizedException();
    }
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
