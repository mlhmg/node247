import { Injectable } from '@nestjs/common';
import { Payload } from './types/payload';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, 'secret_key', { expiresIn: '7d' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}