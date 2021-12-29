import { Res, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}

    // @UseGuards(AuthGuard("jwt"))

    @Post('register')
    async register(@Body(new ValidationPipe()) registerDTO: RegisterDTO) {
      const user = await this.userService.create(registerDTO);
      const payload = {
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }
    @Post('login')
    async login(@Body(new ValidationPipe()) loginDTO: LoginDTO) {
      const user = await this.userService.findByLogin(loginDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    } 
    
    
}