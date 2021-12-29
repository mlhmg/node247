
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';import * as bcrypt from 'bcrypt';
import { IsString } from "class-validator";

export type UserDocument = User & Document;

@Schema()
export class User{
  @Prop()
  email: string;  

  @Prop()
  fullName: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next) {
  var user = this;
  try {
    if (!user.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(user['password'], 10);
    user['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
  // var user = this;
  // console.log(user);
  // if (!user.isModified('password')) return next();

  // bcrypt.genSalt(10, function(err, salt) {
  //     if (err) return next(err);

  //     bcrypt.hash(user., salt, function(err, hash) {
  //         if (err) return next(err);
  //         user.password = hash;
  //         next();
  //     });
  // });
});


