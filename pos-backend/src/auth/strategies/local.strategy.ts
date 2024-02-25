import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import * as localStrategy from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  localStrategy.Strategy,
  'local',
) {
  constructor(private prisma: PrismaService, private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, passport: string): Promise<any> {
    const user = await this.authService.validateUser(email, passport);
    if (!user) {
      throw new ForbiddenException('Invalid Credentials...');
    }
    const passwordMatches = await bcrypt.compare(passport, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid Credentials...');
    }
    return user;
  }
}
