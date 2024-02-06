import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'ユーザー名',
    example: '田中太郎',
  })
  username: string;

  @ApiProperty({
    type: 'number',
    description: '入学年',
    example: 2022,
  })
  enrollment_year: number;

  @ApiProperty({
    type: 'number',
    description: '卒業年',
    example: 2026,
  })
  graduation_year: number;

  @ApiProperty({
    type: 'string',
    description: '就職活動が終了しているかどうか',
    example: false,
  })
  is_job_hunt_completed: boolean;

  @ApiProperty({
    type: 'string',
    description: '自己紹介文',
    example: 'こんにちは、田中太郎です',
  })
  self_introduction: string;

  @ApiProperty({
    type: 'string',
    description: 'アイコンのURL',
    example: 'https://example.com/icon.png',
  })
  icon_url: string;

  @ApiProperty({
    type: 'boolean',
    description: '共有URLでプロフィールを表示するか',
    example: true,
  })
  show_profile_in_shared_url: boolean;

  @ApiProperty({
    type: 'boolean',
    description: '公開イベントでプロフィールを表示するか',
    example: true,
  })
  show_profile_in_public_event: boolean;

  // 所属
  @ApiProperty({
    type: 'object',
    properties: { id: { type: 'number' }, name: { type: 'string' } },
    example: { id: 1, name: '株式会社hoge' },
  })
  affiliation: { id: number; name: string };

  // 希望職種 複数
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: { id: { type: 'number' }, name: { type: 'string' } },
    },
    example: [
      { id: 1, name: 'エンジニア' },
      { id: 2, name: 'デザイナー' },
    ],
  })
  user_jobs: Array<{ id: number; name: string }>;

  // 外部URL
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: { name: { type: 'string' }, url: { type: 'string' } },
    },
    example: [
      { name: 'GitHub', url: 'https://github.com/hoge' },
      { name: 'Twitter', url: 'https://twitter.com/hoge' },
    ],
  })
  user_urls: Array<{ name: string; url: string }>;
}
