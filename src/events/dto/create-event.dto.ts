import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    type: 'string',
    description: 'イベント名',
    example: 'E++',
  })
  name: string;

  @ApiProperty({
    type: 'DateTime',
    description: '開始日',
    example: '2024-02-07T13:00:00', // ISO 8601
    // // 例: 2024年2月7日午後1時0分0秒
  })
  start_at: Date;

  @ApiProperty({
    type: 'DateTime',
    description: '終了日',
    example: '2024-02-09T18:00:00', // ISO 8601
  })
  end_at: Date;

  @ApiProperty({
    type: 'string',
    description: 'アイコンのURL',
    example: 'https://example.com/icon.png',
  })
  icon_url: string;

  @ApiProperty({
    type: 'string',
    description: 'イベントの説明',
    example: 'E++は、ECCの展示イベントです',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'イベントの詳細',
    example:
      'ECCコンピュータ専門学校で夏と冬にやっている展示会です。知らんけど',
  })
  detail: string;

  @ApiProperty({
    type: 'boolean',
    description: '校閲が必要か',
    example: false,
  })
  need_proofreading: boolean;

  @ApiProperty({
    type: 'boolean',
    description: 'パスワードが必要か',
    example: false,
  })
  is_requires_password: boolean;

  @ApiProperty({
    type: 'string',
    description: 'パスワード',
    example: 'password',
  })
  password: string;
}
