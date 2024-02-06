import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeDto {
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
    type: 'boolean',
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

  // 共有URLでプロフィールを表示するか
  @ApiProperty({
    type: 'boolean',
    description: '共有URLでプロフィールを表示するか',
    example: true,
  })
  show_profile_in_shared_url: boolean;

  // 公開イベントでプロフィールを表示するか
  @ApiProperty({
    type: 'boolean',
    description: '公開イベントでプロフィールを表示するか',
    example: true,
  })
  show_profile_in_public_event: boolean;

  // 所属
  @ApiProperty({
    type: 'number',
    description: '所属のID',
    example: 1,
  })
  affiliation_id: number;

  // 希望職種 複数 idの配列
  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    example: [1, 2],
  })
  user_jobs: number[];

  // 外部URL 複数
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: { name: { type: 'string' }, url: { type: 'string' } },
    },
    example: [
      { name: 'GitHub', url: 'https://github.com' },
      { name: 'Twitter', url: 'https://twitter.com' },
    ],
  })
  user_urls: { name: string; url: string }[];
}
