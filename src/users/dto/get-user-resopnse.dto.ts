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
  affiliation: { id: number; name: string };

  // 希望職種 複数
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
      },
    },
  })
  user_jobs: Array<{ id: number; name: string }>;

  // 外部URL
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
      },
    },
  })
  user_urls: Array<{ name: string; url: string }>;

  // 作品情報
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
        catch_copy: {
          type: 'string',
        },
        thumbnail: {
          type: 'string',
        },
      },
    },
  })
  works: Array<{
    id: number;
    name: string;
    catch_copy: string;
    thumbnail: string;
  }>;
}
