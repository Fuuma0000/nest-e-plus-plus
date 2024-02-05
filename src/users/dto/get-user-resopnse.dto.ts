// get-user-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  enrollment_year: number;

  @ApiProperty()
  graduation_year: number;

  @ApiProperty()
  is_job_hunt_completed: boolean;

  @ApiProperty()
  self_introduction: string;

  @ApiProperty()
  icon_url: string;

  // 所属
  @ApiProperty()
  affiliation: Map<number, string>;

  // 希望職種 複数
  @ApiProperty()
  user_jobs: Array<{ id: number; name: string }>;

  // 外部URL
  @ApiProperty()
  user_urls: Array<{ name: string; url: string }>;

  // 作品情報
  @ApiProperty()
  works: Array<{
    id: number;
    name: string;
    catch_copy: string;
    thumbnail: string;
  }>;
}
