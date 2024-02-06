// get-user-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { GetUserResponseDto } from './get-user-resopnse.dto';

export class GetMeResponseDto extends GetUserResponseDto {
  @ApiProperty()
  show_profile_in_shared_url: boolean;

  @ApiProperty()
  show_profile_in_public_event: boolean;
}
