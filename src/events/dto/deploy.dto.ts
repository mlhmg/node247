import { IsHexadecimal } from "class-validator";

export class DeployDto {
  @IsHexadecimal()
  canvasId: string;
}