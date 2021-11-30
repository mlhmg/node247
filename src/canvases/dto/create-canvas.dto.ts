import { IsDate } from "class-validator";

export class CreateCanvasDto {
  @IsDate()
  createdAt: string;
}
