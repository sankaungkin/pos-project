import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import * as jwtStrategy from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(jwtStrategy.Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth'];

          if (data === null) {
            throw new UnauthorizedException();
            // return null;
          }
          if (data === undefined) {
            throw new UnauthorizedException();
          }
          return data.accessToken;
        },
      ]),
    });
  }
  async validate(payload: any) {
    if (payload == null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
