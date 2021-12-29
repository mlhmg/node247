import { HttpStatus } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { RegisterDTO } from './register.dto';
import { User, UserDocument } from './entities/user.schema';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/types/payload';

@Injectable()
export class UserService {
  constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

  async create(registerDTO: RegisterDTO){
    // const { email } = registerDTO;
    const user = await this.userModel.findOne({email: registerDTO.email});
    // console.log(user)
    // console.log(registerDTO)
    if(user){
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }
    const createdUser = new this.userModel(registerDTO);
    createdUser.save();
    return this.sanitizeUser(createdUser);
  }
  
  async findByLogin(loginDTO: LoginDTO) {
    const user = await this.userModel.findOne({ email : loginDTO.email });
    console.log(user)
    console.log(loginDTO)
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(loginDTO.password, user.password)) {
      return this.sanitizeUser(user)
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  
  sanitizeUser(user: User) {
    // console.log(user);
    const sanitized = JSON.parse(JSON.stringify(user));
    // sanitized.password = undefined
    // console.log(sanitized);
    return sanitized;
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
}



