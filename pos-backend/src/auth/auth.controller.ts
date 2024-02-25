import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import { Tokens } from '../types/token.type';
import { SignupDto } from './dtos/signup.dto.ts';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  @Post('/signup')
  signupLocal(@Body() signUpDto: SignupDto): Promise<Tokens> {
    return this.authService.signup(signUpDto);
  }

  @Post('/signin')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res) {
    // const jwtToken = await this.authService.getToken(req.user);
    // const accessToken = req?.user.accessToken;
    // const refreshToken = req?.user.refreshToken;
    // const secretData = {
    //   jwtToken,
    // };
    // console.log('jwtToken', jwtToken);
    // res.cookie('auth', secretData, {
    //   httponly: true,
    //   expires: new Date(new Date().getTime() + 86409000),
    // });

    const jwtTokens = await this.authService.getTokens(
      req.user.id,
      req.user.name,
      req.user.email,
      req.user.role,
    );
    const secretData = {
      accessToken: jwtTokens.access_token,
      refreshToken: jwtTokens.refresh_token,
    };

    await this.authService.updateRefreshHash(
      req.user.id,
      jwtTokens.refresh_token,
    );
    res.cookie('auth', secretData, {
      httponly: true,
      expires: new Date(new Date().getTime() + 86409000),
    });
    return { msg: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('refresh'))
  @Get('refresh')
  async getRefreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.getTokens(
      req.user.id,
      req.user.name,
      req.user.email,
      req.user.role,
    );
    const refreshData = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    };

    // console.log(refreshData);

    res.cookie('auth', refreshData, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 86409000),
    });

    return { msg: 'refresh token has been generated successfully..' };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth');
    return { msg: 'successfully logout' };
  }
}
