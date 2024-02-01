import { ApiProperty } from '@nestjs/swagger';

export class SigninUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
